var express = require('express')
var router = express.Router()
var app = express();
var mysql = require('mysql');
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

router.get('/login', function(req, res) {

    res.sendFile(path.join(__dirname + '/login.html'));
})

router.get('/mainpage', function(req, res) {
    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }
    res.sendFile(path.join(__dirname + '/mainpage.html'));
})

router.get('/form', function(req, res) {
    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }

    return res.sendFile(path.join(__dirname + '/form.html'));
})

router.get('/editprofile', function(req, res) {
    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }

    res.sendFile(path.join(__dirname + '/profile.html'));
})

router.get('/viewprofile', function(req, res) {

    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }

    /* connection.query('TRUNCATE dummy', function(error, results, fields) {
         if (error) {
             res.send({
                 "code": 400,
                 "failed": "error ocurred"
             })
         }
     }) */

    var email = req.session.userId;
    connection.query('SELECT * FROM cust_profile WHERE email = ?', [email], function(error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {

            res.render('viewprofile', { results: results });
        }
    })

});



router.get('/productinfo', function(req, res) {

    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }

    var email = req.session.userId;

    connection.query('SELECT * FROM product WHERE email = ?', [email], function(error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {

            res.render('productinfo', { results: results });
        }
    })

});


router.get('/logout', function(req, res) {
    /*
      connection.query('TRUNCATE dummy', function(error, results, fields) {
          if (error) {
              res.send({
                  "code": 400,
                  "failed": "error ocurred"
              })
          }
      }) */

    req.session.userId = null
    res.sendFile(path.join(__dirname + '/main_index.html'));
})


router.get('/post/:product_id', (req, res) => {

    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }
    var p_id = req.params.product_id;
    console.log(p_id);
    connection.query('SELECT * FROM product WHERE product_id = ?  ', [p_id], function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        res.render('expert_post', { rows: rows })
    })
})


router.get('/fedex/:product_id', (req, res) => {

    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }
    var p_id = req.params.product_id;
    console.log(p_id);
    connection.query('SELECT * FROM fedex WHERE product_id = ?  ', [p_id], function(err, rows, fields) {
        if (err) throw err;
        res.render('fedex_post', { rows: rows })
    })
})



router.get('/home', (req, res) => {
    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }
    /*  connection.query('TRUNCATE server_dummy', function(error, results, fields) {
          if (error) {
              res.send({
                  "code": 400,
                  "failed": "error ocurred"
              })
          }
      }) 
      */
    var username = req.session.userId;

    if (username === 'smart@13') {
        connection.query('SELECT * FROM product', function(err, rows, fields) {

            if (err) throw err;

            res.render('admin', { rows: rows })

        });

    }

    if (username === 'dhilip@dp') {
        var elec = "electronics";
        var status = "pending";
        connection.query('SELECT * FROM product WHERE product_type = ? AND status = ?', [elec, status], function(err, rows, fields) {
            if (err) throw err;
            res.render('expert', { rows: rows })

        });
    } else if (username === 'drb@spi') {

        var elec = "vehicles";
        var status = "pending";
        connection.query('SELECT * FROM product WHERE product_type = ? AND status = ?', [elec, status], function(err, rows, fields) {
            if (err) throw err;
            res.render('expert', { rows: rows })
        })

    } else if (username === 'vidya@vb') {
        var elec = "jewellery";
        var status = "pending";
        connection.query('SELECT * FROM product WHERE product_type = ? AND status = ? ', [elec, status], function(err, rows, fields) {

            if (err) throw err;

            res.render('expert', { rows: rows })

        });
    } else if (username === 'manoj@mj') {
        var elec = "historic";
        var status = "pending";
        connection.query('SELECT * FROM product WHERE prodcut_type = ? AND status = ?', [elec, status], function(err, rows, fields) {

            if (err) throw err;

            res.render('expert', { rows: rows })

        });
    }
})

router.get('/admin/:product_id', (req, res) => {

    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }
    var p_id = req.params.product_id;
    // console.log(p_id);
    connection.query('SELECT * FROM product WHERE product_id = ?  ', [p_id], function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        res.render('owner_post', { rows: rows })
    })
})


//Dues payment

router.get('/paydues', (req, res) => {

    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }
    var user = req.session.userId;
    connection.query('SELECT * FROM mortgage WHERE email = ?  ', [user], function(err, rows, fields) {
        if (err) throw err;
        res.render('paydues', { rows: rows })
    })
})


router.get('/resend', (req, res) => {

    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }

    connection.query('SELECT * FROM resend', function(err, rows, fields) {

        if (err) throw err;

        res.render('resend', { rows: rows })

    });

});









module.exports = router