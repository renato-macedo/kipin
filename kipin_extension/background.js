chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' }, () => {
    console.log('The color is green');
  });
  chrome.browserAction.onClicked.addListener(async tab => {
    const { title, url } = tab;

    const data = { title, url };
    chrome.browserAction.setPopup({ popup: 'ui/popup.html' }, () => {
      console.log('okokokokokokokokoko');
    });
    // try {
    //   console.log('okkokoko');
    //   const response = await fetch('http://localhost:3000/pages', {
    //     method: 'GET',
    //     headers: {
    //       Authorization:
    //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlbmF0b21hY2VuZXRvQGdtYWlsLmNvbSIsInN1YiI6IjVkZTMzMzJkZTA3ZGU3NDY2NDg2NTVkMCIsImlhdCI6MTU3NTkzNjYyOSwiZXhwIjoxNTc1OTQwMjI5fQ.UJeRp6UCTt2Virn2K5eQX49yy8ydqaMuk_jR6_1z3FU',
    //       'Content-Type': 'application/json'
    //     }
    //   });

    //   const json = await response.json();
    //   console.log({ json });
    // } catch (error) {
    //   console.log('uee');
    //   console.log({ error });
    // }
  });
  console.log(chrome);
});
