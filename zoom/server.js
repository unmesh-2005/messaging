const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const uuid = require('uuid');
const parser = require("body-parser");
const urlenc = parser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use(express.static('public'));

const room = uuid.v4();

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/create', (req,res)=>{
  res.redirect(`/${room}`);
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

app.post('/join_room',urlenc, (req, res)=>{
  var r = req.body.roomid;
  
  res.redirect(`/${r}`);
});

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    console.log(roomid + " " + userID)
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId);
    });
  });
});

server.listen(3000,"localhost",()=>{
  console.log("3000");
});