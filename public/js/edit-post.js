// Function to handle the form submission for updating a post
async function updatePost(event) {
    event.preventDefault();
  
    // Fetch the post ID from the form's data attribute
    const postId = event.target.getAttribute("data-post-id");
  
    // Fetch the updated title and content values from the form
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('textarea[name="content"]').value.trim();
  
    // Send a PUT request to the server to update the post
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      // If the update is successful, redirect to the post's page
      document.location.replace(`/post/${postId}`);
    } else {
      // Display an error message if the update fails
      alert("Failed to update post. Please try again.");
    }
  }
  
  // Attach the updatePost function to the form's submit event
  document.querySelector(".edit-post-form").addEventListener("submit", updatePost);
  