// Get references to the form and input elements
const newPostForm = document.getElementById('new-post-form');
const titleInput = document.getElementById('post-title');
const contentInput = document.getElementById('content');

// Function to handle the form submission
const handleFormSubmit = async (event) => {
  event.preventDefault();

  // Get the values from the input fields
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  // Check if the title and content are not empty
  if (title && content) {
    // Send a POST request to the server to create a new post
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If the post is created successfully, redirect to the dashboard page
      document.location.replace('/dashboard');
    } else {
      // If there is an error, display the error message
      alert('Failed to create a new post');
    }
  }
};

// Add an event listener to the form submit event
newPostForm.addEventListener('submit', handleFormSubmit);
