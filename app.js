const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "views");

const usedEmails = [
  "halit@re-coded.com",
  "shrreya@re-coded.com",
  "ammar@re-coded.com",
  "osama@re-coded.com",
  "muhanned@re-coded.com",
];

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => console.log(`Application running on port ${port}`));

module.exports = app;
