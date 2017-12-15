
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
users = [];

io.on('connection', (socket) => {


  /**
   * disconnect
   */
  socket.on('disconnect', function () {
    io.emit('users-changed', { user: socket.nickname, event: 'disconnect' });


  });
  /**
   * connection
   */
  socket.on('set-connection', (idusu, nickname, photo, notification, url, types) => {
    socket.nickname = idusu;
    socket.photo = photo;
    var userss = (idusu);
    users.push(userss);

    io.emit('get-connection', { id: idusu, user: nickname, photo: photo, event: 'connect', evets: notification, urls: url, types: types, s: users });

    console.log(users);

  });

/**
   * discon
   */
  socket.on('set-discon', (idusu, nickname, photo, notification, url, types) => {
    socket.nickname = idusu;

    users.splice(users.indexOf(idusu), 1);
    console.log(users);
    io.emit('users-changed', { id: idusu, user: nickname, photo: photo, event: 'connect', evets: notification, urls: url, types: types, s: users });



  });
 

  socket.on('set-nickname', (dataSocket,idemit,idusu, nickname, photo, notification, url, types) => {
    socket.nickname = dataSocket.name;

    io.emit('users-changed', { idemit:dataSocket.id,id: dataSocket.name, user: dataSocket.name, photo: dataSocket.avatar, event: 'connect', evets: dataSocket.type, urls: dataSocket.url, types: dataSocket.type, s: users,idd:dataSocket.id });



  });



  socket.on('notification', (idusu, nickname, emails, photos,friends) => {
    socket.nickname = idusu;

    io.emit('users-notification', { id: idusu, user: nickname, email: emails, photo: photos ,friends:friends});



  });



  socket.on('set-post', (idusu, nickname, photo, notification, url, types) => {
    socket.nickname = idusu;

    io.emit('users-post', { id: idusu, user: nickname, photo: photo, event: 'connect', evets: notification, urls: url, types: types });



  });

 
  socket.on('set-refresh-data', (datarefres) => { 
 
    io.emit('get-refresh-data', { data: datarefres.refresh ,name: datarefres.name,friends: datarefres.friends ,user: datarefres.user,message: datarefres.type});



  });

  


});


var port = process.env.PORT || 3001;

http.listen(port, function () {
  console.log('listening in http://localhost:' + port);
});
