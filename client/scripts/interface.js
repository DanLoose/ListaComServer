// variaveis
let elements = document.getElementById("elements");
let item = document.querySelector("input[id=item]");

// cria um novo elemento de acordo com o valor do input
function adicionar() {

    if (item.value != '') {
        newPost(item.value);
        item.value = '';
    }
}

// envia uma requisição para deletar o elemento clicado
function fechar(e) {

    let divComID = e.parentNode.parentNode;

    deletePost(divComID);

}

// prepara os html de cada post recebido pelo servidor
function setPosts(post) {

    const FECHAR = "<span style='float: right;' onclick = 'fechar(this)' >x</span>";

    let myElements = '';
    let postElement =

        `<div id=${post.id}>
            <p> ${post.conteudo} ${FECHAR} </p> 
        </div>`

    myElements += postElement;
    return myElements;
}

// atualiza o container que contem os elementos enviados do servidor
function atualizar(e) {
    elements.innerHTML = e;
}
