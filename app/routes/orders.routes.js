const isAuthenticated = require('../middlewares/isAuth')
const controller = require("../controllers/user.controller");
module.exports = function(app) {

    app.get('/user/:userId',isAuthenticated,controller.getUserById);
    app.put('/user/:userId',isAuthenticated,controller.updateUser);
    
}