document.addEventListener("DOMContentLoaded", () => {
    updatePosts();
})

function updatePosts() {

    fetch("http://192.168.0.162:5000/all").then(res => {
        return res.json().then(json => {

            let postElements = '';
            let posts = JSON.parse(json);

            posts.forEach(post => {
                let postElement = ` <div id=${post.id}>
                                <h3>${post.titulo}</h3>
                                <p>${post.conteudo}</p>
                </div>`

                postElements += postElement;

            })

            document.getElementById("posts").innerHTML = postElements;
        })
    })
}

function newPost() {

    let titulo = document.getElementById("title").value;
    let conteudo = document.getElementById("content").value;

    if (titulo != '' && conteudo != '') {

        let post = { titulo, conteudo };
        const options = {
            method: "POST",
            headers: new Headers({ "content-type": 'application/json' }),
            body: JSON.stringify(post)
        }

        fetch("http://192.168.0.162:5000/new", options).then(res => {
            updatePosts();
        })
    }

    document.getElementById('title').value = '';
    document.getElementById("content").value = '';
}

