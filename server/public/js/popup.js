function displayError(display) {
  if (display) {
    document.getElementById('error').style.display = 'flex';
  } else {
    document.getElementById('error').style.display = 'none';
  }
}

const loginOpt = document.querySelector('.login-option');
console.log(loginOpt);
const signupOpt = document.querySelector('.signup-option');
const loginContainer = document.querySelector('.login');
const signupContainer = document.querySelector('.signup');
const title = document.getElementById('title');
console.log();
loginOpt.addEventListener('click', e => {
  displayError(false);
  loginOpt.classList.add('activate');
  signupOpt.classList.remove('activate');
  loginContainer.classList.remove('deactivate');
  signupContainer.classList.add('deactivate');
  title.innerHTML = 'Welcome Back!';
});

signupOpt.addEventListener('click', () => {
  displayError(false);
  loginOpt.classList.remove('activate');
  signupOpt.classList.add('activate');
  signupContainer.classList.remove('deactivate');
  loginContainer.classList.add('deactivate');
  title.innerHTML = 'Sign Up for Free!';
});

// document.getElementById('login').addEventListener('click', async () => {

// });
