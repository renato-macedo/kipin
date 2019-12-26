import axios from 'axios';

//chrome.runtime.onInstalled.addListener(() => {
// when then user clicks on extension icon
chrome.browserAction.onClicked.addListener(tab => {
  chrome.storage.sync.get(['token'], async result => {
    // if there is no token it means the user is not logged is
    if (!result.token) {
      chrome.tabs.create({ url: 'http://localhost:3000/extension' });
    } else {
      console.log(result.token);
      try {
        const response = await axios({
          url: 'http://localhost:3000/items',
          method: 'POST',
          headers: { Authorization: `Bearer ${result.token}` },
          data: {
            body: tab.url,
            title: tab.title
          }
        });
        console.log(response.data);
      } catch (error) {
        console.log({ error });
      }
    }
  });
});
//});

// when user arrives on the page add listener
chrome.webNavigation.onCompleted.addListener(AddOnMessageListener, {
  url: [{ urlMatches: 'http://localhost:3000/extension' }]
});
function AddOnMessageListener() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // if (request.greeting == 'hello') sendResponse({ farewell: 'goodbye' });
    const { access_token } = request;

    // if the message is to save the token
    if (access_token) {
      chrome.storage.sync.set({ token: access_token }, () => {
        console.log('token set');
      });
    }
  });
}
