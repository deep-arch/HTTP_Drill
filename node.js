const path = require("path");
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const uuid = { uuid: uuidv4() };

app.get("/", (req, res) => {
  res.send("<h1>Hello There!</h1>");
});

app.get("/html", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/json", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/jsonFile.json"));
});

app.get("/uuid", (req, res) => {
  res.send(uuid);
});

app.get("/status/:statusCode", (req, res) => {
  res.sendStatus(req.params.statusCode);
});

app.get("/delay/:delayTime", (req, res) => {
  const delayTime = req.params.delayTime;

  setTimeout(() => {
    if (!isNaN(delayTime)) {
      res.send(`<h1>Success, after a delay of ${delayTime} seconds.</h1>`);
    } else {
      res.status(404).send(`<h1>Delay time provided is not acceptable!</h1>`);
    }
  }, delayTime * 1000);
});

app.listen(8000, () => {
  console.log("Server is online!");
});
