const express = require("express");
const posts = require("./model/posts");
const path = require("path");

const PORT = 5000;
const app = express();

app.use(express.static(path.join(__dirname, "client")));
app.use(express.json());

app.get("/all", (req, res) => {
    res.json(JSON.stringify(posts.getAll()))
})

app.post("/new", (req, res) => {

    let content = req.body.conteudo;

    posts.newPost(content);

    res.send("Post adicionado");

})

app.post("/delete", (req,res) => {
    let id = req.body.id;
    posts.deletePost(id);
    res.send("elemento deletado");
})

app.listen(PORT, () => {
    console.log("server online");
})
