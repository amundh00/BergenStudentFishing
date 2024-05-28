// Check if the API key exists in local storage
const accessToken = localStorage.getItem('accessToken');
const userName = localStorage.getItem('userName');

if (accessToken == null) {
    showLoginButton();
} else {
    showLogoutButton();
    showMakePostButton();
}

function showLoginButton() {
    const loginButton = document.createElement('button');
    loginButton.textContent = 'Login';
    loginButton.classList.add('cta-button2');
    loginButton.addEventListener('click', function() {
        window.location.href = '../account/login.html';
    });

    const accountDiv = document.getElementById('account');
    accountDiv.appendChild(loginButton);
}

function showLogoutButton() {
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.classList.add('cta-button2');
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        window.location.href = '../index.html';
    });

    // Append the logout button to the 'account' div
    const accountDiv = document.getElementById('account');
    accountDiv.textContent = `Welcome, ${userName}!`;
    accountDiv.appendChild(logoutButton);
}

function showMakePostButton() {
    const makePostButton = document.createElement('button');
    makePostButton.textContent = 'Make Post';
    makePostButton.classList.add('cta-button2');
    makePostButton.addEventListener('click', function() {
        window.location.href = '../post/make.html'
    })
    const accountDiv = document.getElementById('account');
    accountDiv.appendChild(makePostButton)
}


console.log('Local Storage:', localStorage.getItem('accessToken'));
