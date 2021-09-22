const http = require("http");
const fs = require("fs");
const uuid = { uuid: "14d96bb1-5d53-472f-a96e-b3a1fa82addd" };

const readFile = (path, header, res) => {
  fs.readFile(path, "utf-8", (error, data) => {
    if (error) {
      res.writeHead(404);
      res.write("Not Found");
    } else {
      res.writeHead(200, { "Content-Type": header });
      res.write(data);
    }

    res.end();
  });
};

const app = http.createServer((req, res) => {
  let statusCode = req.url.split("/")[2];
  let delayTime = Number(req.url.split("/")[2]);

  if (req.url === "/") {
    res.write(`<h1>Hello There!</h1>`);

    res.end();
  } else if (req.url === "/html") {
    readFile("public/index.html", "text/html", res);
  } else if (req.url === "/json") {
    readFile("public/jsonFile.json", "application/json", res);
  } else if (req.url === "/uuid") {
    const jsonData = JSON.stringify(uuid);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(jsonData);

    res.end();
  } else if (req.url === `/status/${statusCode}`) {
    res.writeHead(statusCode, { "Content-type": "text/html" });
    res.write(`<h1>Status code is : ${statusCode}  </h1>`);

    res.end();
  } else if (req.url === `/delay/${delayTime}` && !isNaN(delayTime)) {
    setTimeout(() => {
      res.writeHead(200, { "Content-type": "text/html" });
      res.write(`<h1>Success, after a delay of ${delayTime} seconds.</h1>`);

      res.end();
    }, delayTime * 1000);
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.write(`<h1>404 Error! Data is Not Found!</h1>`);

    res.end();
  }
});

app.listen(8000, () => {
  console.log("Server is online!");
});
