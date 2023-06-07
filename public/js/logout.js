// Define the logout function
const logout = async () => {
    try {
      // Send a POST request to the logout endpoint
      const response = await fetch('/api/user/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Check if the response is successful
      if (response.ok) {
        // Redirect the user to the homepage
        document.location.replace('/');
      } else {
        // Throw an error with the response status text
        throw new Error(response.statusText);
      }
    } catch (error) {
      // Handle any errors and display an alert with the error message
      alert(error.message);
    }
  };
  
  // Attach the logout function to the click event of the logout button
  document.querySelector('#logout').addEventListener('click', logout);
  