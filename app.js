var app = require('express')(); 
var server = require('http').Server(app); 
var io = require('socket.io')(server); 

server.listen(8888, function() {
   console.log("Server listening on localhost:888")
}); 

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html'); 
}); 

app.get('/event', function (req, res) {

    firstMethod()
    .then(secondMethod)
    .then(thirdMethod); 
  
    res.send(200); 
}); 
 
var firstMethod = function() {
   var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log('first method completed'); 
        io.emit('process1',  {'status':1, 
         'message':'DATAfrom1'
         }); 
        console.log( {data:'DATAfrom1'}); 
        resolve( {data:'DATAfrom1'}); 
      }, 1000); 
   }); 
   return promise; 
}; 
 
var secondMethod = function(someStuff) {
   var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
         console.log('second method completed'); 
         io.emit('process2',  {'status':1, 
         'message':someStuff.data + ' DATAfrom2'}); 
         console.log( {newData:someStuff.data + ' DATAfrom2'}); 
         resolve( {newData:someStuff.data + ' DATAfrom2'}); 
      }, 2000); 
   }); 
   return promise; 
}; 
 
var thirdMethod = function(someStuff) {
   var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
         console.log('third method completed'); 
         io.emit('process3',  {'status':1, 
         'message':someStuff.newData + ' DATAfrom3'}); 
         console.log( {result:someStuff.newData + ' DATAfrom3'}); 
         resolve( {result:someStuff.newData + ' DATAfrom3'}); 
      }, 3000); 
   }); 
   return promise; 
}; 
 
io.on('connection', function(socket) {
    socket.on('disconnect', function() {}); 
}); 