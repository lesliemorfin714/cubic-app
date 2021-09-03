const Cube = require('../models/Cube');

const index_get = async function (req, res) {
    let cubes = await Cube.find(function (err, cubes){
        if (err) return console.log(err);
    }).lean().exec();
    res.render('index', {cubes: cubes, jwt: req.cookies.jwt}); // cubes is an array, need to pass in as obj for hbs
};

const about_get = (req, res) => {
    res.render('about', {jwt: req.cookies.jwt});
};

const login_get = (req, res) => {
    res.render('loginPage', {jwt: req.cookies.jwt});
};

const register_get = (req, res) => {
    res.render('registerPage', {jwt: req.cookies.jwt});
};

module.exports = {
    index_get,
    about_get,
    login_get,
    register_get,
};