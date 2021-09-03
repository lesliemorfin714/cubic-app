const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    // Register a Handlebars View Engine Using the Node Package
    app.engine('hbs', exphbs({
        extname: 'hbs',
        defaultLayout: null,
    }));
    app.set('view engine', 'hbs'); // Looks for files that end with "handlebars"

    // Body Parser
    app.use(bodyParser.urlencoded({extended: true}));

    // Cookie-parser
    app.use(cookieParser());
    
    // Serve Static Files
    app.use(express.static("./static"));

};