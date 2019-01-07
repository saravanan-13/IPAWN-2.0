var mysql = require('mysql');
var client = require('socket.io').listen(7500).sockets;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
});
connection.connect(function(err, db) {
    if (err) {
        console.log("Error connecting database ... nn");
    }
    client.on('connection', function(socket) {

        sendStatus = function(s) {
            socket.emit('status', s);
        };
        connection.query('SELECT * FROM email ', function(err, results, fields) {
            if (err) throw err;
            var email = results[0].email;
            console.log("Email : " + email);

            if (email === "smart@13") {


                connection.query('SELECT * FROM server_dummy ', function(err, rows, fields) {

                    if (err) throw err;

                    console.log("Product_id : " + rows[0].product_id)

                    var product_id = rows[0].product_id;
                    // emit all chat-messages
                    connection.query('SELECT * FROM chat  where product_id = ? ', product_id, function(err, rows, fields) {

                        if (err) throw err;
                        console.log("Rows : " + rows[0]);
                        socket.emit('output', rows);
                    });

                    socket.on('input', function(data) {

                        var users = {
                            "product_id": product_id,
                            "name": data.name,
                            "message": data.message
                        }
                        whitespacePattern = /^\s*$/;

                        if (whitespacePattern.test(users.name) || whitespacePattern.test(users.message)) {
                            sendStatus('Name and Message is required !');
                        } else {
                            connection.query('INSERT INTO chat SET ?', users, function(error, results, fields) {
                                if (error) {
                                    console.log("error ocurred", error);
                                } else {
                                    // emit latest message to all client
                                    client.emit('output', [data]);

                                    sendStatus({
                                        message: "Message sent",
                                        clear: true
                                    });
                                }
                            });
                        }

                    })
                });

            } else if (email !== "smart@13") {
                connection.query('SELECT * FROM server_dummy ', function(err, rows, fields) {

                    if (err) throw err;

                    console.log("Product_id : " + rows[0].product_id)

                    var product_id = rows[0].product_id;
                    // emit all chat-messages
                    connection.query('SELECT * FROM chat  where product_id = ? ', product_id, function(err, rows, fields) {

                        if (err) throw err;
                        console.log("Rows : " + rows[0]);
                        socket.emit('output', rows);
                    });

                    socket.on('input', function(data) {

                        var users = {
                            "product_id": product_id,
                            "name": data.name,
                            "message": data.message
                        }
                        whitespacePattern = /^\s*$/;

                        if (whitespacePattern.test(users.name) || whitespacePattern.test(users.message)) {
                            sendStatus('Name and Message is required !');
                        } else {
                            connection.query('INSERT INTO chat SET ?', users, function(error, results, fields) {
                                if (error) {
                                    console.log("error ocurred", error);
                                } else {
                                    // emit latest message to all client
                                    client.emit('output', [data]);

                                    sendStatus({
                                        message: "Message sent",
                                        clear: true
                                    });
                                }
                            });
                        }

                    })
                });


            }


        });
    });
});