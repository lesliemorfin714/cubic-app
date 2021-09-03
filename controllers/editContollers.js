const edit_get = async function (req, res) {
    res.render('editCubePage', {jwt: req.cookies.jwt});
};

const delete_get = async function (req, res) {
    res.render("deleteCubePage", {jwt: req.cookies.jwt});
};

module.exports = {
    edit_get,
    delete_get,
};
