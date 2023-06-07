// Get the signup form element
const signupForm = document.getElementById('signup-form');

// Add event listener for form submission
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get the username and password from the form inputs
  const username = document.getElementById('username-signup').value;
  const password = document.getElementById('password-signup').value;

  try {
    // Send a POST request to the signup API endpoint
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If signup is successful, redirect to the login page
      document.location.replace('/login');
    } else {
      // If signup fails, display an error message
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    // Handle any errors that occur during signup
    console.error('Signup failed:', error);
    // Display an error message to the user
    // Replace the following line with your error handling logic
    alert('Signup failed. Please try again.');
  }
});
