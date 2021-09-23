document.addEventListener("DOMContentLoaded", () => {
    updatePosts();
})


const FECHAR = "<span style='float: right;' onclick = 'fechar(this)' >x</span>";

function updatePosts() {

    fetch("http://192.168.0.162:5000/all").then(res => {
        return res.json().then(json => {

            let postElements = '';
            let posts = JSON.parse(json);

            posts.forEach(post => {
                let postElement =

                    `<div id=${post.id}>
                        <p> ${post.conteudo} ${FECHAR} </p> 
                    </div>`

                postElements += postElement;

            })

            atualizar(postElements);
        })
    })
}

function newPost(conteudo) {

    let post = { conteudo: conteudo };

    const options = {
        method: "POST",
        headers: new Headers({ "content-type": 'application/json' }),
        body: JSON.stringify(post)
    }

    fetch("http://192.168.0.162:5000/new", options).then(res => {
        updatePosts();
    })
}

function deletePost(e){

    let post = { id: e.id };

    const options = {
        method: "POST",
        headers: new Headers({ "content-type": 'application/json' }),
        body: JSON.stringify(post)
    }

    fetch("http://192.168.0.162:5000/delete", options).then(res => {
        updatePosts();
    })

}