// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Get the login form
    const loginForm = document.querySelector('#login-form');
  
    // Add event listener to the login form submit button
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        // Get the username and password values
        const username = document.querySelector('#username-input').value.trim();
        const password = document.querySelector('#password-input').value.trim();
  
        if (username && password) {
            // Send a POST request to the login route
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
  
            if (response.ok) {
            // If login is successful, redirect to the homepage
            document.location.replace('/');
        } else {
            // If login fails, display an error message
            const errorMessage = await response.json();
            alert(errorMessage.message);
        }
        }
    });
  
        // Get the signup form
        const signupForm = document.querySelector('#signup-form');
  
        // Add event listener to the signup form submit button
        signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        // Get the username and password values
        const username = document.querySelector('#username-input').value.trim();
        const password = document.querySelector('#password-input').value.trim();
  
        if (username && password) {
            // Send a POST request to the signup route
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
  
            if (response.ok) {
            // If signup is successful, redirect to the homepage
            document.location.replace('/');
        } else {
            // If signup fails, display an error message
            const errorMessage = await response.json();
            alert(errorMessage.message);
        }
        }
    });
});
  