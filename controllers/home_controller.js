const User = require('../models/user.js');
const fs = require('fs');
const path = require('path');

module.exports.homepage = async function (req, res) {
    const user = await User.findById(req.params.id);

    return res.render('home', {
        title: 'Homepage',
    });
};
