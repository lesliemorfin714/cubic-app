const User = require('../models/User');

const auth = async (req, res, next) => {
    console.log("Middleware is running!");
    let token = req.cookies.jwt;
    await User.findByToken(token, (err, user) => {
        if (err) throw err;
        // if (!user) return res.json({
        //     isAuth: false, 
        //     error: true,
        // });
        if (!user) return res.redirect(301, "/");
        req.token = token;
        req.user = user;
        next();
    });

};

module.exports = {auth};
