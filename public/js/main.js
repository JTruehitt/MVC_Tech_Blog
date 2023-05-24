const viewPostBtns = document.querySelectorAll(".viewPostBtn");
const editPostBtns = document.querySelectorAll(".editPostBtn");
const deletePostBtns = document.querySelectorAll(".deletePostBtn");
const newPostForm = document.querySelector(".newPost-form");
const editPostForm = document.querySelector(".editPost-form");

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

viewPostBtns.forEach((btn) => {
  btn.addEventListener("click", getSinglePost);
});

editPostBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    location.assign(`/post/edit/${e.target.dataset.postid}`);
  });
});

deletePostBtns.forEach((btn) => {
  btn.addEventListener("click", getSinglePost);
});

if (newPostForm) {
  newPostForm.addEventListener("submit", handleNewPost);
}

if (editPostForm) {
  editPostForm.addEventListener("submit", submitEditedPost);
}
