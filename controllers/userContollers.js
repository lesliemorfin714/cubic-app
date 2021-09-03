const User = require('../models/User');

const user_register_post = async (req, res) => {
    if (req.body.password !== req.body.repeatPassword) {
        return res.json({"Status":"Passwords do not match"});
    } else {
        let newUser = await new User(req.body);
        newUser.save(function (err, newUser) {
            if (err) {
                console.log(err);
                res.redirect(301, "/register");
            } else {
                console.log("Registration complete");
                res.redirect(301, "/");
            }
        });
    }
};

const user_login_post = async (req, res) => {
    let token = req.cookies.jwt;
    await User.findByToken(token, (err, user) => {
        if (err) return res(err);
        if (user) return res.status(400).json({
            error: true,
            message: "You are already logged in"
        });

        else {
            User.findOne({"username": req.body.username}, function (err, user) {
                if(!user) return res.json({isAuth : false, message : ' Auth failed, user not found'});

                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (!isMatch) return res.json({"Status": "Password is incorrect"});
                    
                    user.generateToken((err, user) => {
                        if (err) return res.status(400).send(err);
                        res.cookie('jwt', user.token, { httpOnly: true, maxAge: 10000 * 10000 });
                        res.redirect(301, "/");
                    });
                });
            });
        }
    });

};

const user_logout_get = async (req, res) => {
    let token = req.cookies.jwt;
    await User.findByToken(token, (err, user) => {
        user.deleteToken(token, (err, user) => {
            if (err) return res.status(400).send(err);
            res.clearCookie("jwt");
            res.redirect("/");
        });
    });
};

module.exports = {
    user_register_post,
    user_login_post,
    user_logout_get,
};