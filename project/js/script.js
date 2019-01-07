(function() {
    var getNode = function(s) {
            return document.querySelector(s);
        },

        status = getNode('.chat-status span'),
        messages = getNode('chat-messages'),
        textarea = getNode('.chat textarea'),
        chatName = getNode('.chat-name');
    statusDefault = status.textContent,
        setStatus = function(s) {
            status.textContent = s;
            if (s !== statusDefault) {
                var delay = setTimeout(function() {
                    setStatus(statusDefault);
                    clearInterval(delay);
                }, 3000);
            }
        };
    setStatus('testing');
    try {
        var socket = io.connect('http://127.0.0.1:8200');
    } catch (e) {

    }

    if (socket !== undefined) {


        // listen for output
        socket.on('output', function(data) {

            //console.log(data);
            if (data.length) {
                for (var x = 0; x < data.length; x = x + 1) {

                    var message = document.createElement("div");
                    //console.log(message);
                    // document.body.appendChild(message);
                    message.setAttribute('class', 'chat-message');
                    message.textContent = data[x].name + ' : ' + data[x].message;
                    //console.log(data[x].name + ' : ' + data[x].message);
                    //Append
                    var msg = document.getElementById("insert")
                        // console.log(msg)
                        // document.body.appendChild(message);
                    msg.appendChild(message);
                    //msg.insertBefore(message, messages.firstChild);


                }
            }

        });

        // listen for status
        socket.on('status', function(data) {
            setStatus((typeof data === 'object') ? data.message : data);

            if (data.clear === true) {
                textarea.value = "";
            }
        });

        //listen for keydown
        textarea.addEventListener('keydown', function(event) {
            var self = this,
                name = chatName.value;
            if (event.which === 13 && event.shiftKey === false) {
                socket.emit('input', {
                    name: name,
                    message: self.value
                });
                event.preventDefault();
            }
        });
    }

})();