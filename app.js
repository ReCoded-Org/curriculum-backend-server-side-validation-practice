const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const {
    check,
    validationResult
} = require("express-validator")

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.json())
app.set("view engine", "ejs")
app.set("views", "views")

const usedEmails = [
    "halit@re-coded.com",
    "shrreya@re-coded.com",
    "ammar@re-coded.com",
    "osama@re-coded.com",
    "muhannad@re-coded.com"
];

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/users",
    check('username', 'Username must be atleast 4 characters long').exists().isLength({
        min: 4
    }).not().matches(/\s/).withMessage('Username should not include spaces').notEmpty().withMessage('Username should not be empty'),
    check('email', 'Invalid email').notEmpty().withMessage('Email should not be empty').isEmail().normalizeEmail(),
    check('email', 'Email already exists').custom((value) => {
        return !(usedEmails.includes(value));
    }),
    check('password', 'The password must be 5+ chars long and contain a number, uppercase and lowercase')
    .isLength({
        min: 5
    })
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/),
    check('password', 'Passwords are not matching').custom((value, {
        req
    }) => {
        if (value !== req.body.confirmPassword) {
            return false
        }
        return true
    }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
             alerts = errors.array()
            res.render("index", {
                alerts
            })
        } else {
            usedEmails.push(req.body.email)
            res.render("index",{
                success:"Congratulations, your account has been successfully created"
            })
        }
    })

app.listen(3000, () => console.log("Server running on port 3000"))

module.exports = app