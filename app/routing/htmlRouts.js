var path = require('path');
var express = require('express');

// setting routes for pages and exporting them to the server
module.exports = function(app) {
    
    app.use('/assets', express.static('assets'));

    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/survey.html'));
    });

    app.use( function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/home.html'));

    });
}