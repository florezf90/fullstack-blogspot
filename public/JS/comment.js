const commentformHanlder = async (event) => {
  event.preventDefault();

  // collect comment content from the comment form
  const commentContent = document
    .querySelector("textarea[name='comment-body']")
    .value.trim();
  //  get the post ID from the URL

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (commentContent) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ post_id, commentContent }),
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
