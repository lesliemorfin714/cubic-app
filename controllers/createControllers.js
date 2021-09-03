const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

const create_cube_get = (req, res) => {
    res.render('createCube', {jwt: req.cookies.jwt});
};

const create_accessory_get = (req, res) => {
    res.render('createAccessory', {jwt: req.cookies.jwt});
};

const create_cube_post = (req, res) => {
    let newCube = new Cube(req.body);
    newCube.save(function (err, newCube) {
        if (err) return console.error(err);
        console.log("Cube saved!");
    });

    res.redirect(301, "/");
};

const create_accessory_post = (req, res) => {
    let newAccessory = new Accessory(req.body);
    newAccessory.save(function (err, newAccessory) {
        if (err) return console.error(err);
        console.log("Accessory saved!");
    });

    res.redirect(301, "/create/accessory");
};

module.exports = {
    create_cube_get,
    create_accessory_get,
    create_cube_post,
    create_accessory_post,
};