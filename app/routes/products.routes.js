const isAuthenticated = require('../middlewares/isAuth')
const controller = require("../controllers/post.controller");
module.exports = function(app) {
    app.get('/post/:userId',isAuthenticated,controller.getPostByUserId);
    app.put('/post/:postId',isAuthenticated,controller.updatePostById);
    app.post('/user/:userId',isAuthenticated,controller.createPost);
    app.delete('/post/:postId',isAuthenticated,controller.deletePostbyId);
}