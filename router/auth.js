const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

require("../db/connection");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Home from router.js");
});

// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, confirmpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !confirmpassword) {
//     return res.status(422).json({ error: "Please fill the field properly" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email already exist." });
//       }
//       const user = new User({
//         name,
//         email,
//         phone,
//         work,
//         password,
//         confirmpassword,
//       });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "User registered successfully" });
//         })
//         .catch((err) =>
//           res.status(500).json({ error: "Failed to registered" })
//         );
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   //   console.log(req.body);
//   //   console.log(req.body.name);
//   //   console.log(name);
//   //   console.log(req.body.email);
//   //   console.log(email);
//   //   res.json({ message: req.body });
//   //   res.send({ message: req.body });
// });

// or we can write in short above code by using async await

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, confirmpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !confirmpassword) {
    return res.status(422).json({ error: "All fields are mandetory." });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exist." });
    } else if (password !== confirmpassword) {
      return res.status(422).json({ error: "Password are not matching" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        confirmpassword,
      });
      // before calling the save method
      await user.save();

      res.status(201).json({ message: "User registered successfully", user });
    }
  } catch (error) {
    console.log(error);
  }
});

// login route

router.post("/signin", async (req, res) => {
  //   console.log(req.body);
  //   res.json("signin success");

  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please filled the data" });
    }
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin)
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      // console.log("token:", token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 9632500000), //30 days
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
      } else {
        res.json({ message: "User signin successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

// About us Page
router.get("/about", authenticate, (req, res) => {
  // console.log("This is about");
  res.send(req.rootUser);
});

// get user data for contact us and home page
router.get("/getdata", authenticate, (req, res) => {
  // console.log("This is contact");
  res.send(req.rootUser);
});

// contact us page
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      // console.log("error in contact form");
      return res.json({ error: "Please Fill the contact form" });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();

      res.status(201).json({ message: "User Contacted successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Logout Page
router.get("/logout", (req, res) => {
  // console.log("This is logout");

  // for logout delete the cookies store with key jwt cookie
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("Logout Successfully");
});

module.exports = router;
