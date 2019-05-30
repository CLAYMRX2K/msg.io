const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'src')));
app.set('views', path.join(__dirname, 'src'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/", function(req, res){

    res.render("index.html")

});

app.use("/admin", function(req, res){

    res.render("admin.html")

});
//aqui ficar todas as messagens to servidor
let messages = [];

io.on('connection', socket => {


    socket.on('sendMessage', data => {
        messages.push(data);
       socket.broadcast.emit('receivedMessage', data) 
      
      //  messages.push(data)
        //socket.broadcast.emit('receivedMessage', data);
    });

});
server.listen(3000);