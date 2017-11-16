let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

var clients = [];
var cant=0;
io.on('connection', (socket) => {


  console.log('user connected' );
   socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.nickname, event: 'disconnect'});

     clients.splice(clients.indexOf(socket.nickname));
  });



  socket.on('set-nickname', (idusu,nickname,photo,notification,url,types) => {
    socket.nickname = idusu;

    io.emit('users-changed', {id:idusu,user: nickname,photo:photo,  event: 'connect',evets:notification,urls:url,types:types});

       console.log(socket.nickname );

});

socket.on('set-post', (idusu,nickname,photo,notification,url,types) => {
  socket.nickname = idusu;

io.emit('users-post', {id:idusu,user: nickname,photo:photo,  event: 'connect',evets:notification,urls:url,types:types});

console.log(socket.nickname );

});

  socket.on('disconnect', function(){
    console.log('user disconnected');
    cant--;

  });


});


var port = process.env.PORT || 3001;

http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});
