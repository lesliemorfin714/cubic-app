const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

const details_id_get = async function (req, res) {
    let cubeId = req.params.id;
    // cubeId = req.url.split("/")[2]; // Alt way to get ID
    const cube = await Cube.findById(cubeId).populate('accessories').lean().exec();
    res.render('details', {cube: cube, jwt: req.cookies.jwt});
};

const details_attach_accessory_get = async function (req, res) {
    const cubeId = req.params.id;
    const cube = await Cube.findById(cubeId, (err, cube) => {
        if (err) return console.log(err); 
    });
        
    let outputObj = {
        jwt: req.cookies.jwt,
        cube: {
            accessories: cube.accessories,
            _id: cube._id,
            name: cube.name,
            imageUrl: cube.imageUrl,
        },
    };
        
    let outputArr = [];
    if (outputObj.cube.accessories.length === 0) {
        // Grab all accessories from accessories database
        await Accessory.find({}, function (err, accessories){
            accessories.forEach(accessory => {
                outputArr.push({ _id: accessory.id, name: accessory.name});
            });    
        });

        // Create new property to outputObj so hbs can render data from two collections
        outputObj.options = outputArr;

    } else {
        // Grab all docs in accessories collection that are not equal to the values in cube.accessories array
        const availableAccessories = await Accessory.find({ _id: { $nin: cube.accessories } });
        outputObj.options = availableAccessories;
    }

    res.render("attachAccessory", outputObj);
};

const details_attach_accessory_post = async function (req, res) {
    const accessoryId = req.body.accessory.split(" ")[1];
    const cubeId = req.params.id;

    // Grab cube by ID
    const cube = await Cube.findById(cubeId);

    // Assign accessory's ID to found cube
    cube.accessories.push(accessoryId);
    await cube.save();

    // Grab accessory by ID
    const accessory = await Accessory.findById(accessoryId);
    accessory.cubes.push(cubeId);
    await accessory.save();

    res.redirect(301, `/details/${cubeId}`);
};

module.exports = {
    details_id_get,
    details_attach_accessory_get,
    details_attach_accessory_post,
};
