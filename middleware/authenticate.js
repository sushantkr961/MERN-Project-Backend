const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {
  try {
    // get token from cookies
    const token = req.cookies.jwtoken;

    // verify the token of token get to secret key
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    // after verification get all data of user from backend(mongo)
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    // if user not found
    if (!rootUser) {
      throw new Error("User not Found");
    }

    // get each data of user like id,token and all
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized: No token provided");
    console.log(error);
  }
};

module.exports = Authenticate;
