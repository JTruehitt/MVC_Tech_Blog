const viewPostBtns = document.querySelectorAll(".viewPostBtn");
const editPostBtns = document.querySelectorAll(".editPostBtn");
const deletePostBtns = document.querySelectorAll(".deletePostBtn");
const newPostForm = document.querySelector(".newPost-form");
const editPostForm = document.querySelector(".editPost-form");
const commentSubmitForm = document.querySelector(".comment-submit");
const deleteCommentBtn = document.querySelector(".deleteCommentBtn");

async function getSinglePost(e) {
  e.preventDefault();
  let postid = e.target.dataset.postid;

  location.assign(`/post/${postid}`);
}

async function handleNewPost(e) {
  e.preventDefault();
  let title = document.querySelector("#post_title").value.trim();
  let description = document.querySelector("#post_body").value.trim();

  const response = await fetch("/api/post/new", {
    method: "POST",
    body: JSON.stringify({ title, description }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    alert("Post successful.");
    document.location.replace("/dashboard");
  }
}

async function submitEditedPost(e) {
  try {
    e.preventDefault();
    let title = document.querySelector("#post_title").value.trim();
    let description = document.querySelector("#post_body").value.trim();
    let url = location.pathname;

    const response = await fetch(`/api${url}`, {
      method: "PUT",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Post update successful.");
      location.assign("/dashboard");
    }
  } catch (err) {
    console.log(err);
  }
}

async function deletePost(e) {
  let postid = e.target.dataset.postid;

  const response = await fetch(`/api/post/delete/${postid}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    alert("Error deleting post. Please try again.");
    return;
  }

  alert("Post successfully deleted.");
  location.assign("/dashboard");
}

async function handleCommentSubmit(e) {
  // message, user_id, post_id
  e.preventDefault();
  let message = document.querySelector("#comment-message").value.trim();
  let post_id = document.querySelector(".commentSubmitBtn").dataset.postid;

  const response = await fetch(`/api/comment`, {
    method: "POST",
    body: JSON.stringify({ message, post_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    location.reload();
  }
}

async function handleDeleteComment(e) {
  let comment_id = e.target.dataset.comment_id;
  const response = await fetch(`/api/comment/${comment_id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    location.reload();
  }


}

viewPostBtns.forEach((btn) => {
  btn.addEventListener("click", getSinglePost);
});

editPostBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    location.assign(`/post/edit/${e.target.dataset.postid}`);
  });
});

deletePostBtns.forEach((btn) => {
  btn.addEventListener("click", deletePost);
});

if (commentSubmitForm) {
  commentSubmitForm.addEventListener("submit", handleCommentSubmit);
}

if (newPostForm) {
  newPostForm.addEventListener("submit", handleNewPost);
}

if (editPostForm) {
  editPostForm.addEventListener("submit", submitEditedPost);
}

if (deleteCommentBtn) {
  deleteCommentBtn.addEventListener("click", handleDeleteComment);
}
