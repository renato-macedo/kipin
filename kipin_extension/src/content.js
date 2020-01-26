console.log('injected');
const sleep = time => new Promise(res => setTimeout(res, time));

document.addEventListener('login', e => {
  console.log('login event fired');
  console.log(e.detail.data);
  chrome.runtime.sendMessage(e.detail.data);
  //  window.close();
});

const ListeningEvent = new CustomEvent('listening');

document.dispatchEvent(ListeningEvent);
console.log('dispatched listening event');
console.log('fim do content script');
