// ============= GERENCIAMENTO DO SERVIDOR =============
// aqui é controlado o status online ou offline do servidor 
// todas as requisições sao tratadas aqui com suas devidas ações

// requisitando bibliotecas e arquivos que serão utilizados
const express = require("express");
const path = require("path");
const posts = require("./model/posts");
const fs = require("fs");
const { start } = require("./model/posts");

// porta que o servidor está rodando
const PORT = 5000;

// inicialização do express
const app = express();
app.use(express.static(path.join(__dirname, "client")));
app.use(express.json());

// requisições do tipo get precisam mandar os elementos armazenados
app.get("/all", (req, res) => {
    res.json(JSON.stringify(posts.getAll()))
    setBackup();
})

// requisição do tipo post = novo post adicionado
app.post("/new", (req, res) => {

    // armazenda o conteudo do novo post enviado pelo front
    let content = req.body.conteudo;

    // adiciona ao array o novo post
    posts.newPost(content);

    // resposta do servidor
    setBackup();
    res.send("Post adicionado");

})

// requisição do tipo post = post deletado 
app.post("/delete", (req, res) => {

    // recupera o id do elemento a ser deletado
    let id = req.body.id;

    // deleta o elemento com id recebido do array
    posts.deletePost(id);

    //resposta do servidor
    setBackup();
    res.send("elemento deletado");
})

// rescreve arquivo de backup a cada mudança que ouver no servidor
function setBackup() {

    // recupera todos os posts da lista
    let myPosts = JSON.stringify(posts.getAll());

    // armazena em um documento de texto no computador
    fs.writeFile("./backup/lista.txt", myPosts, (err) => {
        if (err) throw err;
    })
}

// ao iniciar o servidor, o servidor vai ser recarregado a partir do arquivo de backup do computador
function getBackup() {

    // lendo o arquivo de backup 
    fs.readFile("./backup/lista.txt", (err, data) => {
        if(err) throw err;
        else {
            // atualizando o servidor 
            posts.start(data.toString());   
        }
    })
}

// gerenciamento de status do servidor (online/offline)
app.listen(PORT, () => {
    getBackup();
    console.log("server online");
})
