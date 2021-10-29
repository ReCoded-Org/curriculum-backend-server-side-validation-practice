const express = require("express");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");

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

app.post(
  "/users",
  check("username", "Username must be at least 4 characters long")
    .notEmpty()
    .withMessage("Username should not be empty")
    .isLength({min: 4})
    .not()
    .matches(/\s/)
    .withMessage("Username should not include spaces"),
  check("email", "Invalid email")
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()
    .normalizeEmail()
    .custom((value) => !usedEmails.includes(value))
    .withMessage("Email already exists"),
  check("password", "Password must be at least 5 characters long")
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({min: 5})
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .withMessage("Password must contain a number, uppercase and lowercase")
    .custom((value, { req }) => value === req.body.confirmPassword)
    .withMessage("Passwords are not matching"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      alerts = errors.array();
      res.render("index", {alerts});
    } else {
      usedEmails.push(req.body.email);
      res.render("index", {
        success: "Congratulations, your account has been successfully created!",
      });
    }
  }
);

app.listen(port, () => console.log(`Application running on port ${port}`));

module.exports = app;
