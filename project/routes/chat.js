var express = require('express')
var router = express.Router()
var app = express();
var sys = require('sys');
var exec = require('child_process').exec;
var mysql = require('mysql');
var multer = require('multer');
var upload = multer({ dest: 'project/uploads/' })
app.set('view engine', 'ejs');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
});
connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});



router.get('/admin/:product_id', function(req, res) {
    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    } else {
        console.log(req.params.product_id)
        var users = {
            "product_id": req.params.product_id
        }
        connection.query("UPDATE server_dummy SET ?", users, function(error, results, fields) {
            if (error) {
                console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                console.log(" Entry Success!");

                var email = {
                    "email": req.session.userId
                }
                connection.query("UPDATE  email SET ?", email, function(error, results, fields) {
                    if (error) {
                        console.log("error ocurred", error);
                        res.send({
                            "code": 400,
                            "failed": "error ocurred"
                        })

                    }
                });
                setTimeout(function() {

                    var child = exec("node /home/saravanan/Documents/I-PAWN/project/routes/server.js", function(error, stdout, stderr) {
                        sys.print('stdout : ' + stdout);
                        sys.print('stderr : ' + stderr);
                        if (error !== null) {
                            console.log('exec error : ' + error);
                        }
                    })
                }, 1000);
                setTimeout(function() {
                    res.sendFile(path.join(__dirname + '/index.html'));
                }, 2000);

            }
        })
    }
});



router.get('/customer/:product_id', function(req, res) {
    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    } else {
        console.log(req.params.product_id)
        var users = {
            "product_id": req.params.product_id
        }
        connection.query("UPDATE dummy SET ?", users, function(error, results, fields) {
            if (error) {
                console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                console.log(" Entry Success!");

                var email = {
                    "email": req.session.userId
                }
                connection.query("UPDATE  email SET ?", email, function(error, results, fields) {
                    if (error) {
                        console.log("error ocurred", error);
                        res.send({
                            "code": 400,
                            "failed": "error ocurred"
                        })

                    }
                });
                setTimeout(function() {
                    var child = exec("node /home/saravanan/Documents/I-PAWN/project/routes/server.js", function(error, stdout, stderr) {
                        console.log('stdout : ' + stdout);
                        console.log('stderr : ' + stderr);
                        if (error !== null) {
                            console.log('exec error : ' + error);
                        }
                    })
                }, 1000);

                setTimeout(function() {
                    res.sendFile(path.join(__dirname + '/index.html'));
                }, 2000);
            }
        })
    }
});





module.exports = router