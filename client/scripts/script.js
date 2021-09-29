// aguarda a pagina carregar para depois recuperar os elemntos do servidor
document.addEventListener("DOMContentLoaded", () => {
    updatePosts();
})


const URL = "http://10.10.146.169:5000/";

function updatePosts() {

    // envia uma requisição para o servidor recuperar os elementos armazenados
    // o retorno da requisição é o array "posts" que armazena os elementos do servidor
    fetch(URL + "all").then(res => {
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
    fetch(URL + "new", options).then(res => {

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
    fetch(URL + "delete", options).then(res => {

        // atualiza a pagina apos a exclusao do elemento
        updatePosts();
    })

}

setInterval(() => {
    updatePosts();
}, 1000);