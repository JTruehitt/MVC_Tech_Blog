const viewPostBtns = document.querySelectorAll('.viewPostBtn')
// const postsContainer = document.querySelector('.posts-container')


async function getSinglePost(e) {
    e.preventDefault;
    let postid = e.target.dataset.postid;

    location.assign(`/post/${postid}`)
}

viewPostBtns.forEach(btn => {
    btn.addEventListener('click', getSinglePost)
})
