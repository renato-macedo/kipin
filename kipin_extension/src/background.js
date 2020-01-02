let URLs = [];
chrome.storage.local.get(['URLs'], storage => {
  if (storage.URLs) {
    URLs = storage.URLs;
  }
});

chrome.storage.sync.get(['token'], async ({ token }) => {
  if (token) {
    await syncURLs(token);
  }
});

// // when the extension is installed or updated
// chrome.runtime.onInstalled.addListener(() => {

// });

chrome.webNavigation.onCompleted.addListener(tab => {
  console.log('ue');
  console.log(tab);
  const { tabId, url } = tab;
  if (URLs.includes(url)) {
    console.log({ tabId });
    updateIcon(tabId, true);
  } else {
    console.log(url, 'nao pertence a', URLs);
  }

  if (url === 'http://localhost:3000/extension') {
    chrome.runtime.onMessage.addListener(
      async (request, sender, sendResponse) => {
        // if (request.greeting == 'hello') sendResponse({ farewell: 'goodbye' });
        const { access_token } = request;

        // if the message is to save the token
        if (access_token) {
          chrome.storage.sync.set({ token: access_token }, () => {
            console.log('token set');
          });

          // the user is authenticated lets update the URLs set
          await syncURLs(access_token);
        }
      }
    );
  }
});

// when then user clicks on extension icon to add a new page
chrome.browserAction.onClicked.addListener(tab => {
  // verify if there is authenticated
  chrome.storage.sync.get(['token'], async ({ token }) => {
    // if there is no token it means the user is not logged in
    if (!token) {
      // so we go to extension page to get the token
      chrome.tabs.create({ url: 'http://localhost:3000/extension' });
    } else {
      console.log(tab);
      // if the user is authenticated
      const { title, url, id } = tab;
      console.log({ title, url, id });
      console.log({ URLs });

      if (URLs.includes(url)) {
        updateIcon(id, true);
      } else {
        console.log('pagina nao esta salva');
        try {
          const data = await service({
            url: 'http://localhost:3000/items',
            method: 'POST',
            data: { body: url, title },
            token
          });
          console.log('depois de salvar', data);
          // add the new URL to the set
          //URLs.push(data.body);
          updateIcon(id, true);
          await syncURLs(token);
        } catch (error) {
          console.log('erro ao salvar a pagina', error);
        }
      }
    }
  });
});

async function syncURLs(token) {
  const data = await service({
    url: 'http://localhost:3000/items',
    method: 'GET',
    token
  });
  console.log(data);
  const newURLs = data.map(({ body }) => body);

  chrome.storage.local.set({ URLs: newURLs }, () => {
    console.log('URLs updated');
    URLs = newURLs;
  });

  // URLs = [...URLs, ...newURLs].reduce((acc, value) => {
  //   if (!acc.includes(value)) {
  //     acc.push(value);
  //   }
  //   return acc;
  // }, []);
}

// this is a helper for the fetch function
async function service({ url, method, data, token }) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${token}`);

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
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

function updateIcon(tabId, saved) {
  const path = saved === true ? 'icon.png' : 'icon_2.png';
  console.log({ path });
  chrome.browserAction.setIcon({ path, tabId }, () => {
    chrome.browserAction.setTitle({
      title: 'This page is already save',
      tabId
    });
  });
}
