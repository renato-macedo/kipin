'use strict';
const HOMEPAGE = 'http://localhost:3000/login';
var URLs = [];

// // when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['token'], async ({ token }) => {
    if (token) {
      await syncURLs(token);
      chrome.storage.local.get(['URLs'], storage => {
        if (storage.URLs) {
          URLs = storage.URLs;
        }
      });
    }
  });

  chrome.webNavigation.onCompleted.addListener(tab => {
    //console.log(tab);
    const { tabId, url } = tab;
    if (URLs.includes(url)) {
      console.log('navigation');
      updateIcon(true, tabId);
    }
  });

  chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
      console.log('request', request);
      const { token, refresh_token } = request;

      // if the message is to save the token
      if (token) {
        chrome.storage.sync.set({ refresh_token });
        chrome.storage.sync.set({ token }, () => {
          console.log('token set');
        });

        // the user is authenticated lets update the URLs set
        await syncURLs(token);
      }
    }
  );
  chrome.history.onVisited.addListener(result => {
    const { url } = result;
    if (URLs.includes(url)) {
      updateIcon(true);
    } else {
      console.log(url, 'nao pertence a', URLs);
      updateIcon(false);
    }
  });

  // when then user clicks on extension icon to add a new page
  chrome.browserAction.onClicked.addListener(tab => {
    // verify if Its authenticated
    chrome.storage.sync.get(['token'], ({ token }) => {
      // if there is no token it means the user is not logged in
      //console.log('token', token);
      savePage(tab, token);
    });
  });
});

/* ------------------------------------------------------------------------------------------------------------------------- */

async function savePage(tab, token) {
  if (!token) {
    // so we go to extension page to get the token
    chrome.tabs.create({ url: HOMEPAGE });
  } else {
    console.log(tab);
    // if the user is authenticated
    const { title, url, id } = tab;

    if (URLs.includes(url)) {
      updateIcon(true, id);
    } else {
      updateIcon(false, id);

      const data = await service({
        url: 'http://localhost:3000/items',
        method: 'POST',
        data: { body: url, title },
        token
      });
      console.log({ data });
      if (data) {
        if (data.statusCode !== 401) {
          //  && data.statusCode !== 400 && data.statusCode !== 401
          updateIcon(true, id);
          await syncURLs(token);
        } else {
          console.log('erro ao salvar URL');
          chrome.storage.sync.get(['refresh_token'], ({ refresh_token }) => {
            renewToken(refresh_token).then(() => {
              savePage(tab, refresh_token);
            });
          });
        }
      }
    }
  }
  return false;
}

async function syncURLs(token) {
  try {
    const data = await service({
      url: 'http://localhost:3000/items',
      method: 'GET',
      token
    });

    const newURLs = data.map(({ body }) => body);

    chrome.storage.local.set({ URLs: newURLs }, () => {
      console.log('URLs updated');
      URLs = newURLs;
    });
  } catch (error) {
    console.log('erro ao sincronizar');
    chrome.storage.local.set({ URLs: [] }, () => {
      console.log('URLs updated');
      URLs = [];
    });
  }
}

/**
 * @description update the browser action icon, true for saved page icon
 */
function updateIcon(saved, tabId) {
  const path = saved === true ? 'icon.png' : 'icon_2.png';
  console.log(tabId, path);
  if (tabId) {
    chrome.browserAction.setIcon({ path, tabId }, () => {
      chrome.browserAction.setTitle({
        title: 'This page is already save',
        tabId
      });
    });
  } else {
    chrome.browserAction.setIcon({ path }, () => {
      chrome.browserAction.setTitle({
        title: 'This page is already save',
        tabId
      });
    });
  }
}

/**
 * @description this a helper for the Fetch function
 */
async function service({ url, method, data, token }) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  let body;
  console.log(method, url);
  if (method === 'POST') {
    body = JSON.stringify(data);
    console.log(body);
  }

  const requestConfig = {
    method: method,
    headers,
    body
  };

  try {
    const response = await fetch(url, requestConfig);
    const data = await response.json();

    // if (data.statusCode === 401) {
    //   chrome.storage.sync.set({ token: '' });
    //   chrome.tabs.create({ url: HOMEPAGE });
    //   return data;
    // }
    return data;
  } catch (error) {
    console.log('server error', error);
    return null;
  }
}

async function renewToken(refreshToken) {
  const body = { refresh_token: refreshToken };
  const data = await service({
    url: 'http://localhost:3000/auth/refresh_token/mobile',
    method: 'POST',
    data: body
  });

  chrome.storage.sync.set({ token: data.token }, () => {
    console.log('new token set');
  });
}
