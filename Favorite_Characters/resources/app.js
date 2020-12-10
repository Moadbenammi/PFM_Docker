var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();

app.use(express.static(path.join(__dirname, "Files")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, resp) => {
  resp.sendFile("index.html", { root: path.join(__dirname, "./Files") });
});

app.post("/", function (req, res) {
  // Donnée envoyée par le client
  let recievedData = req.body;

  // On récupère les données deja existantes dans le JSON
  let jsonData = require("./Files/characters.json");

  // On ajoute les nouvelles données dans le tableau du JSON
  jsonData.push(recievedData);

  fs.open(
    path.resolve(__dirname, "Files", "characters.json"),
    "w+",
    (err, fileDescriptor) => {
      if (!err & fileDescriptor) {
        fs.writeFile(fileDescriptor, JSON.stringify(jsonData), (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) { 
                res.sendFile("index.html", { root: path.join(__dirname, "./Files") });
                return;
              } else {
                res.status(500).send("Server Error");
                throw err;
              }
            });
          } else {
            res.status(500).send("Server Error");

            throw err;
          }
        });
      } else {
        res.status(500).send("Server Error");
        throw err;
      }
    }
  );
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is running");
});
