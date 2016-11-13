// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
// var bodyParser = require('body-parser');
// use it!
// app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
// post route for adding a user
app.post('/users', function(req, res) {
 console.log("POST DATA", req.body);
 // This is where we would add the user to the database
 // Then redirect to the root route
 res.redirect('/');
})
// tell the express app to listen on port 8000
var server = app.listen(5000, function() {
 console.log("listening on port 5000");
});


var count = 0;
var io = require('socket.io').listen(server);


io.sockets.on("connection", function (socket){
  console.log("We are using sockets");
  console.log(socket.id);

socket.on("button_clicked", function(data){
  console.log('someone clicked a button, reason: ' + data.reason);
  count++;
  io.emit('server_response', {count});
})
})
