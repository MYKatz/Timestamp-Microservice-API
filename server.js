// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:STRING", function (request, response) {
  var string = request.params.STRING;
  var object = {
    "unix": null,
    "natural": null,
  };
  var d;
  if(Number.isInteger(parseInt(string))){
    d = new Date(parseInt(string));
    object["unix"] = parseInt(string);
    object["natural"] = months[d.getMonth()] + " " + d.getDate() + ", " + d.getYear();
  }
  else{
    d = new Date(string);
    if(d.toString() != "Invalid Date"){
      
    
    object["unix"] = d.getTime() / 1000;
    object["natural"] = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    }
  }
  response.json(object);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
