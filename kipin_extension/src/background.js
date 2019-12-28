// this is like the state of the application
let URLs = [];

// when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // first, we need to make the function that will sync the set of urls with the ones there on there server
  async function syncURLs(token) {
    const data = await service({
      url: 'http://localhost:3000/items',
      method: 'GET',
      token
    });
    const newURLs = data.map(({ body }) => body);
    URLs = [...URLs, ...newURLs].reduce((acc, value) => {
      if (!acc.includes(value)) {
        acc.push(value);
      }
      return acc;
    }, []);
  }

  // second, if the user is authenticated we need to update the URLs
  chrome.storage.sync.get(['token'], async ({ token }) => {
    if (token) {
      await syncURLs(token);
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
        // if the user is authenticated
        const { title, url } = tab;
        console.log(token);
        if (!URLs.includes(url)) {
          try {
            const data = await service({
              url: 'http://localhost:3000/items',
              method: 'POST',
              body: { body: url, title },
              token
            });
            console.log(data);
            // add the new URL to the set
            URLs.push(data.body);

            updateIcon(tab.tabId);
          } catch (error) {
            console.log({ error });
          }
        } else {
          updateIcon(tab.tabId);
        }
      }
    });
  });

  chrome.webNavigation.onCompleted.addListener(({ tabId, url }) => {
    if (URLs.includes(url)) {
      updateIcon(tabId);
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
});

// this is a helper for the fetch function
async function service({ url, method, body, token }) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${token}`);

  const requestConfig = {
    method: method,
    headers,
    body: method === 'GET' ? undefined : JSON.stringify(body)
  };

  const response = await fetch(url, requestConfig);
  return response.json();
}

function updateIcon(tabId) {
  chrome.browserAction.setIcon({ path: 'icon.png', tabId }, () => {
    chrome.browserAction.setTitle({
      title: 'This page is already save',
      tabId
    });
  });
}
