const viewPostBtns = document.querySelectorAll('.viewPostBtn')
const newPostForm = document.querySelector('.newPost-form')

async function getSinglePost(e) {
    e.preventDefault();
    let postid = e.target.dataset.postid;

    location.assign(`/post/${postid}`)
}

async function handleNewPost(e) {
    e.preventDefault();
    let title = document.querySelector('#post_title');
    let description = document.querySelector('#post_body');

    const response = await fetch('/api/post/new', {
        method: 'POST',
        body: JSON.stringify({ title, description})
    })

    if (response.ok) {
        alert('Post successful.');
        document.location.replace('/dashboard')
    }
}



viewPostBtns.forEach(btn => {
    btn.addEventListener('click', getSinglePost)
})

