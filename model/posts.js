module.exports = {

    posts: [

    ],

    getAll() {
        return this.posts;
    },

    newPost(conteudo) {
        this.posts.push({ id: generateID(), conteudo: conteudo });
    },

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


function generateID() {
    return Math.random().toString(36).substr(2, 9);
}