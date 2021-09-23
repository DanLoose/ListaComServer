module.exports = {

    posts: [
        {
            id: "asdasfsadfsa",
            titulo: "esse é um titulo teste",
            conteudo: "esse é o conteudo do teste",
        }
    ],

    getAll(){
        return this.posts;
    },

    newPost(titulo, conteudo){
        this.posts.push({id: generateID(),titulo,conteudo});
    },

}


function generateID(){
    return Math.random().toString(36).substr(2, 9);
}