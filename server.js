const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const {v4 : uuidV4} = require("uuid");

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req,res)=>{
  res.render("index");
});

app.get("/join", (req,res)=>{
  res.render("join");
});

app.get("/chat", (req, res) => {
  res.render("chat");
});

app.listen(3000, ()=>{
  console.log("listening to port 3000");
});