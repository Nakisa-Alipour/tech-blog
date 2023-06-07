// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the login form element
    const loginForm = document.getElementById('login-form');
  
    // Add event listener for form submission
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Get the username and password values from the form
      const username = document.getElementById('username-login').value;
      const password = document.getElementById('password-login').value;
  
      // Create an object with the login data
      const loginData = {
        username,
        password
      };
  
      try {
        // Send a POST request to the server with the login data
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        });
  
        // Check if the login was successful
        if (response.ok) {
          // Redirect the user to the dashboard page
          window.location.replace('/dashboard');
        } else {
          // Display an error message
          alert('Login failed. Please check your username and password.');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    });
  });
  