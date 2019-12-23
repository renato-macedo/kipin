chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' }, () => {
    console.log('The color is green');
  });
  chrome.storage.sync.get(['color'], function(result) {
    console.log('Value currently is ' + result.color);
  });

  // when then user clicks on extension icon
  chrome.browserAction.onClicked.addListener(async tab => {
    chrome.storage.sync.get(['token'], result => {
      // if there is no token it means the user is not logged is
      if (!result.token) {
        chrome.tabs.create({ url: 'http://localhost:3000/extension' });
      } else {
        console.log('you have a token');
      }
    });
  });
});

// when user arrives on the page add listener
chrome.webNavigation.onCompleted.addListener(AddOnMessageListener, {
  url: [{ urlMatches: 'http://localhost:3000/extension' }]
});
function AddOnMessageListener() {
  console.log('porra');
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // if (request.greeting == 'hello') sendResponse({ farewell: 'goodbye' });
    console.log({ request, sender });
    const { access_token } = request;
    if (access_token) {
      chrome.storage.sync.set({ token: access_token }, () => {
        console.log('token set');
      });
    }
  });
}
