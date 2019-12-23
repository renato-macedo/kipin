if (location.href === 'http://localhost:3000/extension') {
}
document.getElementById('login').addEventListener('mouseover', () => {
  chrome.runtime.sendMessage({ message: 'top top' });
});

document.getElementById('login').addEventListener('click', async () => {
  const email = document.getElementById('login_email').value;
  const password = document.getElementById('login_password').value;

  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (response.status == 401) {
    displayError(true);
  } else {
    displayError(false);
    const data = await response.json();
    chrome.runtime.sendMessage(data);
  }
});
function displayError(display) {
  if (display) {
    document.getElementById('error').style.display = 'flex';
  } else {
    document.getElementById('error').style.display = 'none';
  }
}
