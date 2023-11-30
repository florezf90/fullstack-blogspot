const commentformHanlder = async (event) => {
  event.preventDefault();

  // collect comment content from the comment form
  const commentContent = document.querySelector("#comment-input").value.trim();
  //  get the post ID from the URL
  const currentUrl = window.location.href;
  const urlParts = currentUrl.split("/");
  const postId = urlParts[urlParts.length - 1];
  // creates an object with comment, post ID and User ID
  const commentData = {
    content: commentContent,
    post_id: postId,
  };

  console.log(commentContent);
  console.log(postId);

  if (commentContent) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/comments/post${postId}`, {
      method: "POST",
      body: JSON.stringify({ commentData }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submmit", commentformHanlder);
