// Function to handle the deletion of a post
async function deletePost() {
    // Fetch the post ID from the delete button's data attribute
    const postId = this.getAttribute("data-post-id");
  
    // Send a DELETE request to the server to delete the post
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      // If the deletion is successful, redirect to the homepage
      document.location.replace("/");
    } else {
      // Display an error message if the deletion fails
      alert("Failed to delete post. Please try again.");
    }
  }
  
  // Attach the deletePost function to the delete button's click event
  document.querySelector(".delete-post-btn").addEventListener("click", deletePost);
  