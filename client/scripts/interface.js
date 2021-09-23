let elements = document.getElementById("elements");
let item = document.querySelector("input[id=item]");

function adicionar() {

    if (item.value != '') {
        newPost(item.value);
        item.value = '';
    }
}

function fechar(e) {

    let divComID = e.parentNode.parentNode;

    deletePost(divComID);

}

function atualizar(e) {
    elements.innerHTML = e;
}