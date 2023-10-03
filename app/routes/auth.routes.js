const controller = require("../controllers/auth.controller");
const verifyToken = require ('../middlewares/isAuth')
const alreadyRegister = require ('../middlewares/isRegister')

module.exports = function(app) {

    app.post('/register',alreadyRegister, controller.register);
    app.post('/login',controller.login);
    app.post('/logout',controller.logout)

}