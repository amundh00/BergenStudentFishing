document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    authenticateUser(email, password);
});

function authenticateUser(email, password) {
    const apiUrl = 'https://v2.api.noroff.dev/auth/login';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Authentication failed');
        }
        return response.json();
    })
    .then(responseData => {
        const accessToken = responseData.data.accessToken;
        const userName = responseData.data.name
    
        console.log('Access Token:', accessToken); 
    
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userName', userName)
    
        console.log('Authentication successful');
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Authentication error:', error);
    });
}

console.log('Local Storage:', localStorage.getItem('accessToken'));