// let changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', data => {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

// changeColor.onclick = function(e) {
//   let color = e.target.value;
//   chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//     chrome.tabs.executeScript(tabs[0].id, {
//       code: 'document.body.style.backgroundColor = "' + color + '";'
//     });
//   });
// };

const loginOpt = document.querySelector('.login-option');
console.log(loginOpt);
const signupOpt = document.querySelector('.signup-option');
const loginContainer = document.querySelector('.login');
const signupContainer = document.querySelector('.signup');
const title = document.getElementById('title');
loginOpt.addEventListener('click', e => {
  loginOpt.classList.add('activate');
  signupOpt.classList.remove('activate');
  loginContainer.classList.remove('deactivate');
  signupContainer.classList.add('deactivate');
  title.innerHTML = 'Welcome Back!';
});

signupOpt.addEventListener('click', () => {
  loginOpt.classList.remove('activate');
  signupOpt.classList.add('activate');
  signupContainer.classList.remove('deactivate');
  loginContainer.classList.add('deactivate');
  title.innerHTML = 'Sign Up for Free!';
});
