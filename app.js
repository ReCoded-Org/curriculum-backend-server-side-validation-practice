
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const { check, validationResult } = require("express-validator")

app.use(bodyParser.urlencoded({ extended: false }))
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

app.get("/", (req, res ) => {
    res.render("index",{errorMessage})
})

app.post("/users",
check('username', 'This username must be atleast 4 characters long').exists().isLength({min:4}),
check('email', 'Invalid email').isEmail().normalizeEmail(),
check('email', 'Email already exists').custom((value) => {
	return !(usedEmails.includes(value));
}),
check('password', 'The password must be 5+ chars long and contain a number')
.not()
.isIn(['123', 'password', 'god'])
.withMessage('Do not use a common word as the password')
.isLength({ min: 5 })
.matches(/\d/),
check('password').custom((value,{req}) => {
	if(value !== req.body.confirmPassword){
		return false
	}
	return true
}),
 (req,res) => {
	 console.log(req.body)
	const errors = validationResult(req);
	if(errors){
		const alerts = errors.array()
		console.log(alerts)
		res.render("index",{
			alerts
		})
	}else{
		res.json(req.body)
	}
})

app.listen(3000, () => console.log("Server running on port 3000"))

module.exports = app