var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mysql = require("mysql");


var app = express();

app.set("views", "resources/Files/views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "Files")));
app.use(bodyParser.urlencoded({ extended: false }));

//Connection phase
var connection = mysql.createConnection({
  host: "mysql-db",
  user: "root",
  password: "rootroot",
  database: "Pr-inpt",
});

connection.connect((err) => {
  if (err) throw err;
  else {
    console.log("Connected to DB succusfully!!");
  }
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM personnage", (err, result) => {
    if (err) throw err;
    else { res.render('index',{result : result})}
  });

});

app.post("/", (req, res) => {
  let recievedData = {
    name: req.body.name,
    characteristics: req.body.characteristics,
    photo: req.body.photo,
  };
  connection.query(
    `INSERT INTO personnage(name,photo,characteristics) VALUES ('${recievedData.name}','${recievedData.photo}','${recievedData.characteristics}')`
  );
  res.redirect('/');

});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is running");
});
