
var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var path = require("path");

var app = express();

app.set("views", "./public/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Connection phase
var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'mysql-db',
  user: process.env.MYSQL_USER || 'root',
  port : process.env.MYSQL_PORT || '3306',
  password: process.env.MYSQL_PASS || 'rootroot',
  database: process.env.MYSQL_DB   || 'Pr-inpt',
  
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
    else { res.render('index.ejs',{result : result})}
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
  res.render('index');

});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is running");
});
