const viewPostBtns = document.querySelectorAll('.viewPostBtn')

async function getSinglePost(e) {
    e.preventDefault;
    let postid = e.target.dataset.postid;

    location.assign(`/post/${postid}`)
}

viewPostBtns.forEach(btn => {
    btn.addEventListener('click', getSinglePost)
})
