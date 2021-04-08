const express = require("express");
const apis = require("./api");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("Server running on port: 3000");
});

// routes
app.get("/", apis.chatAnalyser);
