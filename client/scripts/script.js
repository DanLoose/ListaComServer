// aguarda a pagina carregar para depois recuperar os elemntos do servidor
document.addEventListener("DOMContentLoaded", () => {
    updatePosts();
})


function updatePosts() {

    // envia uma requisição para o servidor recuperar os elementos armazenados
    // o retorno da requisição é o array "posts" que armazena os elementos do servidor
    fetch("http://192.168.0.162:5000/all").then(res => {
        return res.json().then(json => {

            let postElements = '';

            // recupera o array posts no servidor
            let posts = JSON.parse(json);

            //percorre o array que armazena os posts 
            posts.forEach(post => {

                //armazena o html dos elementos q serao renderizados em atualizar
                postElements += setPosts(post);

            })

            atualizar(postElements);
        })
    })
}

function newPost(conteudo) {

    // objeto post com o conteudo recebido da interface que será enviado para o servidor
    let post = { conteudo: conteudo };

    // setando o método http e enviando post pelo body 
    const options = {
        method: "POST",
        headers: new Headers({ "content-type": 'application/json' }),
        body: JSON.stringify(post)
    }

    // envia uma requisição para o servidor enviando as informações do novo post q sera armazenado
    fetch("http://192.168.0.162:5000/new", options).then(res => {

        // atualiza a pagina depois de armazenar o objeto
        updatePosts();
    })
}

function deletePost(e) {

    // objeto post com o id do post a ser excluido
    let post = { id: e.id };

    // setando o método http e enviando o id do elmento a ser excluido pelo body 
    const options = {
        method: "POST",
        headers: new Headers({ "content-type": 'application/json' }),
        body: JSON.stringify(post)
    }

    // envia uma requisição para o servidor com o id do elmeento a ser excluido
    fetch("http://192.168.0.162:5000/delete", options).then(res => {

        // atualiza a pagina apos a exclusao do elemento
        updatePosts();
    })

}