// Get the comment form element
const commentForm = document.querySelector('#comment-form');

// Handle form submission
commentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the comment input value
  const commentInput = document.querySelector('#comment');
  const commentBody = commentInput.value.trim();

  if (commentBody) {
    try {
      // Send a POST request to the server to create a new comment
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ commentBody }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Reload the page to display the new comment
        location.reload();
      } else {
        console.error('Failed to create comment');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  }
});
