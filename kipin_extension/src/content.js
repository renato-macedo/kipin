document.addEventListener('login', e => {
  chrome.runtime.sendMessage(e.detail.data);
});
