var mysql = require('mysql');
var mv = require('mv');

var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');

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

exports.register = function(req, res) {
    console.log("req", req.body);
    var users = {
        "firstname": req.body.fname,
        "lastname": req.body.lname,
        "email": req.body.mail,
        "password": req.body.pass,
    }
    req.session.userId = users.email;

    var dummy = {
        "firstname": '',
        "lastname": '',
        "email": users.email,
        "phone": 4654132,
        "address": '',
        "city": '',
        "zipcode": 00,
    }
    var dumb = {
        "email": users.email,
        "card_number": 2132121,
        "card_name": users.email,
        "expiry_month": 10,
        "expiry_year": 2222,
        "cvv_code": 00,
        "balance": 00
    }


    users.password = cryptr.encrypt(users.password)
    console.log(users.password);
    connection.query('INSERT INTO signup SET ?', users, function(error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.sendFile(path.join(__dirname + '/404.html'));
        } else {

            connection.query('INSERT INTO cust_profile SET ?', dummy, function(error, results, fields) {
                if (error) {
                    console.log("error ocurred", error);
                    res.sendFile(path.join(__dirname + '/404.html'));
                }
            });
            connection.query('INSERT INTO card_details SET ?', dumb, function(error, results, fields) {
                if (error) {
                    console.log("error ocurred", error);
                    res.sendFile(path.join(__dirname + '/404.html'));
                }
            });

            console.log("Success!");
            res.sendFile(path.join(__dirname + '/mainpage.html'));
        }
    })
}


exports.login = function(req, res) {

    var email = req.body.mail;
    req.session.userId = email;
    var password = req.body.pass;
    password = cryptr.encrypt(password)
    console.log(password);
    connection.query('SELECT * FROM signup WHERE email = ?', [email], function(error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            if (results.length > 0) {
                if (results[0].password === password) {
                    console.log(req.session.userId)
                    console.log("Success!");


                    //owner and expert
                    var username = req.body.mail;
                    if (username === 'smart@13') {
                        connection.query('SELECT * FROM product', function(err, rows, fields) {

                            if (err) throw err;

                            res.render('admin', { rows: rows })

                        });

                    } else
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
                        connection.query('SELECT * FROM product WHERE product_type = ? AND status = ?', [elec, status], function(err, rows, fields) {

                            if (err) throw err;

                            res.render('expert', { rows: rows })

                        });
                    } else if (username === 'fed@ex') {
                        connection.query('SELECT * FROM fedex', function(err, rows, fields) {

                            if (err) throw err;

                            res.render('fedex', { rows: rows })

                        });
                    } else {
                        res.sendFile(path.join(__dirname + '/mainpage.html'));
                    }
                } else {
                    res.sendFile(path.join(__dirname + '/404.html'));
                }
            } else {
                res.sendFile(path.join(__dirname + '/404.html'));
            }
        }
    });
}


exports.submit = function(req, res) {

    //console.log("req", req.body);
    //console.log(req.session.userId);
    var users = {
        "email": req.session.userId,
        "cust_name": req.body.cname,
        "product_name": req.body.pname,
        "product_type": req.body.ptype,
        "type": req.body.ttype,
        "proof": req.body.pproof,
        "description": req.body.message,
        "status": "pending",
        "amount": 0
    }

    connection.query('INSERT INTO product SET ?', users, function(error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            console.log("Success!");
            res.sendFile(path.join(__dirname + '/mainpage.html'));
        }
    });


}


exports.enter = function(req, res) {
    console.log("req", req.session.userId);
    var users = {
        "firstname": req.body.first_name,
        "lastname": req.body.last_name,
        "email": req.session.userId,
        "phone": req.body.phone,
        "address": req.body.address,
        "city": req.body.city,
        "zipcode": req.body.zip,
    }
    var card = {
        "card_number": req.body.cnumber,
        "card_name": req.body.cname,
        "expiry_month": req.body.month,
        "expiry_year": req.body.year,
        "cvv_code": req.body.cvv,
        "balance": "10000"
    }
    connection.query('UPDATE cust_profile SET firstname = ?,lastname= ?,email=?, phone = ? , address = ? ,city = ? , zipcode = ?  WHERE email = ? ', [users.firstname, users.lastname, users.email, users.phone, users.address, users.city, users.zipcode, users.email], function(error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            console.log("Success!");
            res.sendFile(path.join(__dirname + '/mainpage.html'));
            connection.query('UPDATE card_details SET email = ?, card_number = ?,card_name = ?,expiry_month = ?,expiry_year=?,cvv_code= ?,balance= ? WHERE email = ?', [users.email, card.card_number, card.card_name, card.expiry_month, card.expiry_year, card.cvv_code, card.balance, users.email], function(error, results, fields) {
                if (error) {
                    console.log("error ocurred", error);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    })
                } else {
                    console.log("Success!");
                    res.sendFile(path.join(__dirname + '/mainpage.html'));
                }
            });
        }
    });
}


exports.quote = function(req, res) {
    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }
    var amount = req.body.quote;
    var pro = req.params.product_id
    var status = "amount quoted"
    console.log("Amount : " + amount);
    console.log("pro" + pro);
    connection.query('UPDATE product SET status = ?, amount = ? WHERE product_id = ?', [status, amount, pro], function(error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            /* console.log("Success!");
             res.send({
                 "code": 200,
                 "success": "success"
             })
             */
            var username = req.session.userId;

            console.log("Username : " + username);

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
                    console.log(rows);
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
                connection.query('SELECT * FROM product WHERE product_type = ? AND status = ?', [elec, status], function(err, rows, fields) {

                    if (err) throw err;

                    res.render('expert', { rows: rows })

                });
            }
        }

    })

}



exports.final = function(req, res) {
    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }
    var amount = req.body.final
    var pro = req.params.product_id
    var status = "Amount Finalized"
    console.log("Amount : " + amount);
    console.log("pro" + pro);

    connection.query('SELECT * FROM product WHERE product_id = ? ', [pro], function(err, rows, fields) {

        if (err) throw err;
        else {

            connection.query('SELECT * FROM cust_profile WHERE email = ? ', [rows[0].email], function(err, result, fields) {

                if (err) throw err;
                else {

                    var users = {
                        "email": result[0].email,
                        "cust_name": result[0].firstname + result[0].lastname,
                        "product_id": rows[0].product_id,
                        "product_name": rows[0].product_name,
                        "address": result[0].address,
                        "phone": result[0].phone,
                        "city": result[0].city,
                        "zipcode": result[0].zipcode
                    }
                    connection.query('INSERT INTO fedex SET ?', users, function(error, results, fields) {

                        if (error) {
                            console.log("error ocurred", error);
                            res.send({
                                "code": 400,
                                "failed": "error ocurred"
                            })
                        } else {
                            console.log("Success entry !");
                            //  res.sendFile(path.join(__dirname + '/mainpage.html'));
                        }

                    });

                }

            });

        }

    });

    connection.query('UPDATE product SET status = ?, amount = ? WHERE product_id = ?', [status, amount, pro], function(error, results, fields) {
        //  if (err) throw err;
        // else {
        connection.query('SELECT * FROM product ', function(err, rows, fields) {
            if (err) throw err;
            res.render('admin', { rows: rows })

        });
        // }

    })

}



exports.fedex = function(req, res) {
    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }
    var pro = req.params.product_id;

    connection.query('SELECT * FROM product WHERE product_id = ? ', [pro], function(err, rows, fields) {

        if (err) throw err;
        else {

            var status = "Money Transacted";
            var interest = 2000;
            var amount = parseInt(rows[0].amount) + parseInt(interest)
            console.log("Amount : " + amount);

            var users = {
                "email": rows[0].email,
                "cust_name": rows[0].cust_name,
                "type": rows[0].type,
                "product_name": rows[0].product_name,
                "product_id": rows[0].product_id,
                "product_type": rows[0].product_type,
                "status": "item pickedup",
                "total_amount": rows[0].amount,
                "amount_remaining": amount,
                "amount_paid": 0
            }

            if (rows[0].type === "Sell" || rows[0].type === "sell") {
                var sell = {
                    "email": rows[0].email,
                    "cust_name": rows[0].cust_name,
                    "type": rows[0].type,
                    "product_name": rows[0].product_name,
                    "product_id": rows[0].product_id,
                    "product_type": rows[0].product_type,
                    "status": "item pickedup",
                    "amount": rows[0].amount
                }
                connection.query('INSERT INTO sell SET ?', sell, function(error, results, fields) {



                    if (error) {
                        console.log("error ocurred", error);
                        res.send({
                            "code": 400,
                            "failed": "error ocurred"
                        })
                    } else {
                        console.log("Success entry !");
                        connection.query('DELETE FROM fedex WHERE product_id = ?', rows[0].product_id, function(error, results, fields) {

                            if (error) {
                                console.log("error ocurred", error);
                                res.send({
                                    "code": 400,
                                    "failed": "error ocurred"
                                })
                            } else {
                                console.log("Success delete!");

                            }

                        });

                    }

                });

            }
            //mortgage
            else if (users.type === "Mortgage" || users.type === "mortgage") {
                connection.query('INSERT INTO mortgage SET ?', users, function(error, results, fields) {

                    if (error) {
                        console.log("error ocurred", error);
                        res.send({
                            "code": 400,
                            "failed": "error ocurred"
                        })
                    } else {
                        console.log("Success entry !");
                        connection.query('DELETE FROM fedex WHERE product_id = ?', rows[0].product_id, function(error, results, fields) {

                            if (error) {
                                console.log("error ocurred", error);
                                res.send({
                                    "code": 400,
                                    "failed": "error ocurred"
                                })
                            } else {
                                console.log("Success delete!");

                            }

                        });

                    }

                });


            }
            connection.query('UPDATE product SET status = ? WHERE product_id = ?', [status, rows[0].product_id], function(error, results, fields) {
                //  if (err) throw err;
                // else {
                connection.query('SELECT * FROM fedex ', function(err, rows, fields) {
                    if (err) throw err;
                    res.render('fedex', { rows: rows })

                });
                // }

            });

        }
    });
}




//paydues


exports.paydues = function(req, res) {
    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    } else {
        var pro = req.params.product_id;
        var paid = parseInt(req.body.paid);
        console.log("Amount paid : " + paid)

        connection.query('SELECT * FROM card_details where email = ? ', [req.session.userId], function(err, rows, fields) {
            if (err) throw err;
            var check = parseInt(rows[0].balance);
            if (paid > check) {
                res.sendFile(path.join(__dirname + '/no_balance.html'));
            } else {
                connection.query('SELECT * FROM mortgage WHERE product_id = ? ', [pro], function(err, results, fields) {
                    if (err) throw err;
                    var amount_paid = parseInt(paid) + parseInt(results[0].amount_paid);
                    var amount_remaining = parseInt(results[0].amount_remaining) - parseInt(paid);
                    console.log("Amount remaining : " + amount_remaining);
                    console.log("Amount paid : " + amount_paid);

                    if (amount_remaining === 0) {

                        connection.query('SELECT * FROM cust_profile WHERE email = ? ', [results[0].email], function(err, amt, fields) {
                            if (err) throw err;
                            var insert = {
                                "email": results[0].email,
                                "cust_name": results[0].cust_name,
                                "product_id": results[0].product_id,
                                "product_name": results[0].product_name,
                                "address": amt[0].address,
                                "phone": amt[0].phone,
                                "city": amt[0].city,
                                "zipcode": amt[0].zipcode
                            }

                            connection.query('INSERT INTO resend SET ?', insert, function(error, results, fields) {
                                if (err) throw err;

                                connection.query('UPDATE product SET status = "Dues completed" WHERE product_id = ?', [insert.product_id], function(error, results, fields) {
                                    if (err) throw err;

                                    connection.query('DELETE FROM mortgage WHERE product_id = ?', insert.product_id, function(error, results, fields) {
                                        if (err) throw err;
                                        console.log("Success delete!");
                                        var user = req.session.userId;
                                        connection.query('SELECT * FROM mortgage WHERE email = ? ', [user], function(err, rows, fields) {
                                            if (err) throw err;
                                            res.render('paydues', { rows: rows })
                                        });

                                    });


                                });

                            });

                        });

                    } else {
                        connection.query('UPDATE mortgage SET amount_remaining = ? ,amount_paid = ?   WHERE product_id = ?', [amount_remaining, amount_paid, pro], function(error, results, fields) {
                            if (err) throw err;
                            var user = req.session.userId;
                            console.log(user);
                            connection.query('SELECT * FROM mortgage WHERE email = ? ', [user], function(err, rows, fields) {
                                if (err) throw err;
                                res.render('paydues', { rows: rows })
                            });
                        });

                    }

                });
            }

        });
    }
}




exports.resend = function(req, res) {
    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }
    var pro = req.params.product_id;
    var status = "Item Send Back"
    connection.query('UPDATE product SET status = ? WHERE product_id = ?', [status, pro], function(err, results, fields) {
        if (err) throw err;
        connection.query('DELETE FROM resend WHERE product_id = ?', pro, function(err, results, fields) {
            if (err) throw err;
            console.log("Success delete!");

            connection.query('SELECT * FROM resend ', function(err, rows, fields) {
                if (err) throw err;
                res.render('resend', { rows: rows })
            });
        });

    });
}


exports.delete = function(req, res) {
    if (!req.session.userId) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }
    var pro = req.params.product_id;
    connection.query('DELETE FROM product WHERE product_id = ?', pro, function(err, results, fields) {
        if (err) throw err;
        console.log("Success delete!");
        connection.query('SELECT * FROM product ', function(err, rows, fields) {
            if (err) throw err;
            res.render('admin', { rows: rows })
        });
    });
}