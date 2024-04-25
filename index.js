var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config({ path: "./.env" });

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

// Define a schema for users
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post("/login", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    
    User.findOne({ email: email, password: password }).exec()
        .then(user => {
            if (!user) {
                return res.redirect('/login.html?error=Invalid email or password');
            }
            return res.redirect('home.html');
        })
        .catch(err => {
            console.error("Error during login:", err);
            return res.status(500).send("Internal Server Error");
        });
});



app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.passwordr;

    db.collection('users').findOne({ email: email }, (err, user) => {
        if (err) {
            throw err;
        }
        if (user) {
            console.log("user exist")
            return res.send("User already exists with this email!");
        } else {
            var data = {
                "name": name,
                "email": email,
                "phno": phno,
                "password": password
            };
            db.collection('users').insertOne(data, (err, collection) => {
                if (err) {
                    throw err;
                }
                console.log("Record Inserted Successfully");
                return res.redirect('home.html');
            });
        }
    });
});


app.get("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": '*' 
    });
    return res.redirect('index.html');
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
    console.log("local host:http://localhost:3000/")
});

