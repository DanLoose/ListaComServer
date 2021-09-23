// ============= GERENCIAMENTO DO SERVIDOR =============
// aqui é controlado o status online ou offline do servidor 
// todas as requisições sao tratadas aqui com suas devidas ações

// requisitando bibliotecas e arquivos que serão utilizados
const express = require("express");
const path = require("path");
const posts = require("./model/posts");

// porta que o servidor está rodando
const PORT = 5000;

// inicialização do express
const app = express();
app.use(express.static(path.join(__dirname, "client")));
app.use(express.json());

// requisições do tipo get precisam mandar os elementos armazenados
app.get("/all", (req, res) => {
    res.json(JSON.stringify(posts.getAll()))
})

// requisição do tipo post = novo post adicionado
app.post("/new", (req, res) => {

    // armazenda o conteudo do novo post enviado pelo front
    let content = req.body.conteudo;

    // adiciona ao array o novo post
    posts.newPost(content);

    // resposta do servidor
    res.send("Post adicionado");

})

// requisição do tipo post = post deletado 
app.post("/delete", (req,res) => {

    // recupera o id do elemento a ser deletado
    let id = req.body.id;

    // deleta o elemento com id recebido do array
    posts.deletePost(id);

    //resposta do servidor
    res.send("elemento deletado");
})

// gerenciamento de status do servidor (online/offline)
app.listen(PORT, () => {
    console.log("server online");
})
