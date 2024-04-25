// Check if the API key exists in local storage
const accessToken = localStorage.getItem('accessToken');
const userName = localStorage.getItem('userName');

if (accessToken == null) {
    showLoginButton();
} else {
    showLogoutButton();
}

function showLoginButton() {
    const loginButton = document.createElement('button');
    loginButton.textContent = 'Login';
    loginButton.addEventListener('click', function() {
        window.location.href = 'login.html';
    });

    const accountDiv = document.getElementById('account');
    accountDiv.appendChild(loginButton);
}

function showLogoutButton() {
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        window.location.href = 'index.html';
    });

    // Append the logout button to the 'account' div
    const accountDiv = document.getElementById('account');
    accountDiv.textContent = `Welcome, ${userName}!`;
    accountDiv.appendChild(logoutButton);
}

console.log('Local Storage:', localStorage.getItem('accessToken'));
