const publicController = require('../controllers/publicController');
const createController = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');
const userController = require('../controllers/userController');
const editController = require('../controllers/editController');
const session = require('express-session');
const {auth} = require('../middleware/auth');

module.exports = (app) => {    
    app.get('/', publicController.index_get);

    app.get('/about', publicController.about_get);

    app.get('/login', publicController.login_get);

    app.get('/register', publicController.register_get);

    app.get('/create/cube', createController.create_cube_get);

    app.get('/create/accessory', createController.create_accessory_get);

    app.get('/details/:id', detailsController.details_id_get);

    app.get('/details/attach/accessory/:id', detailsController.details_attach_accessory_get);

    app.get('/edit', editController.edit_get);

    app.get('/delete', editController.delete_get);

    app.get('/logout', userController.user_logout_get);

    app.get('/*', (req, res) => {
        res.render('404', {jwt: req.cookies.jwt});
    });
    
    app.post('/create/cube', createController.create_cube_post);

    app.post('/create/accessory', createController.create_accessory_post);

    app.post('/details/attach/accessory/:id', detailsController.details_attach_accessory_post);

    app.post('/register', userController.user_register_post);

    app.post('/login', userController.user_login_post);
};