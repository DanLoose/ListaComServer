// ============== OBJETO POSTS ==============
// o objeto posts armazena os posts da lista e 
// todos os métodos de controle que adicionam,
// removem, ou retornam todos os elmentos que se en_
// contram armazenados na lista

module.exports = {

    posts: [

    ],

    // retorna elementos armazenados
    getAll() {
        return this.posts;
    },

    // adiciona novo post em posts
    newPost(conteudo) {
        this.posts.push({ id: generateID(), conteudo: conteudo });
    },

    // deleta um post existente em posts
    deletePost(id){
        let i;
        this.posts.forEach(post => {
            if(post.id == id) {
                i = this.posts.indexOf(post);
                this.posts.splice(i,1);
            }
        })

    }

}

// gera um id para cada elemento adicionado 
function generateID() {
    return Math.random().toString(36).substr(2, 9);
}