var http = require('http');
var express = require('express');
var fs = require("fs");
var cors = require("cors");
var bodyParser = require("body-parser");
var passwordHash = require('password-hash');
var jwt = require('jwt-simple');
var config = require('./DataConfig');
var app = express();
var router = express.Router();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/ping', function (req, res) {
    var output = {};
    output.status = 1;
    output.message = "ok";
    res.json(output);
});

router.post('/read', function (req, res) {
    var decoded = jwt.decode(req.body.expires, require('./secret')());
    if (req.body && req.body.session != 'Session Not Valid' && (decoded.expires && decoded.expires > Date.now())) {
        fs.readFile("data.json", "utf-8", function (err, data) {
            var output = {};
            if (err) {
                output.status = 0;
                output.message = err;
            }
            else {
                output.status = 1;
                output.message = data;
            }
            res.json(output);
        });
    }
    else {
        if(decoded.expires && decoded.expires <= Date.now()){
            var output = {};
            output.status = 400;
            output.message = 'Token Expired';
            res.json(output);
        }
        else{
            var output = {};
            output.message = 'Session Not Valid';
            output.status = 0;
            res.json(output);
        }
    }

});

router.post('/save', function (req, res) {
    var decoded = jwt.decode(req.body.expires, require('./secret.js')());
    if (req.body && req.body.session != 'Session Not Valid' && (decoded.expires && decoded.expires > Date.now())) {
        var writeObj = {
            "id": req.body.id,
            "serviceendpoint": req.body.serviceendpoint,
            "logoutendpoint": req.body.logoutendpoint,
            "signingcertificate": req.body.signingcertificate,
            "password": req.body.password,
            "encryptioncertificate": req.body.encryptioncertificate,
            "algorithm": req.body.algorithm,
            "format": req.body.format,
        }
        fs.writeFile("data.json", JSON.stringify(writeObj), "utf-8", function (err, data) {
            var output = {};
            if (err) {
                output.status = 0;
                output.message = err;
            }
            else {
                output.status = 1;
                output.message = "SuccessFull Written in File";
            }
            res.json(output);
        });
    }
    else {
        if(decoded.expires && decoded.expires <= Date.now()){
            var output = {};
            output.status = 400;
            output.message = 'Token Expired';
            res.json(output);
        }
        else{
            var output = {};
            output.message = 'Session Not Valid';
            output.status = 0;
            res.json(output);
        }
    }

});

router.post('/login', function (req, res) {
    var output = {};
    if (req.body.id == 'admin@admin.com' && req.body.password == 'admin') {
        var data = req.body.id + " " + req.body.password;
        var session = passwordHash.generate(data);
        var dateObj = Date.now();
        var expires = dateObj + config.timeout;
        var token = jwt.encode({
            expires: expires
        }, require('./secret')());
        output.message = session;
        output.expires = token;
        output.status = 1;
    }
    else {
        output.message = 'Session Not Valid';
        output.status = 0;
    }
    res.json(output);
});

app.use('/api', router);


app.use(express.static(__dirname + "/"));


var server = http.createServer(app).listen(3000, function () {
    console.log("SSL Express server listening on port " + 3000);
});

module.exports = server;