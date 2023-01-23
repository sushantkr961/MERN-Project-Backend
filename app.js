require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT;

// import connection file
require("./db/connection");

app.use(express.json());
app.use(cookieParser());

// import userSchema
// const User = require("./model/userSchema");

// we link the router file here from auth.js
app.use(require("./router/auth"));

// Middleware
// const middleware = (req, res, next) => {
//   console.log("This is Middleware");
//   next();
// };

// app.get("/", (req, res) => {
//   res.send("This is Home");
// });

// app.get("/about", middleware, (req, res) => {
//   console.log("This is about");
//   res.send("About");
// });

// app.get("/contact", middleware, (req, res) => {
//   // res.cookie("jwtoken", "token"); // for checking
//   res.send("Contact");
// });

// app.get("/signin", (req, res) => {
//   res.send("SignIn");
// });

// app.get("/signup", (req, res) => {
//   res.send("SingUp");
// });

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
