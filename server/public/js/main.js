function displayError(display) {
  if (display) {
    document.getElementById('error').style.display = 'flex';
  } else {
    document.getElementById('error').style.display = 'none';
  }
}

const loginOpt = document.querySelector('.login-option');
const signupOpt = document.querySelector('.signup-option');
const loginContainer = document.querySelector('.login');
const signupContainer = document.querySelector('.signup');
const title = document.getElementById('title');

loginOpt.addEventListener('click', () => {
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

document.getElementById('login').addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('login_email').value;
  const password = document.getElementById('login_password').value;

  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.status == 401) {
    displayError(true);
  } else {
    displayError(false);
    const data = await response.json();
    const LoginEvent = new CustomEvent('login', { detail: { data } });
    document.dispatchEvent(LoginEvent);
    alert(data.access_token);
    window.close();
  }
});
