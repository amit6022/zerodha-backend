const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../Model/UserModel");

module.exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exist, you can login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    //jwtToken assigned to session
    const savedUser = await UserModel.findOne({ email });
    // const jwtToken = jwt.sign(
    //   { email: savedUser.email, _id: savedUser._id },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "24h" }
    // );
    res.status(200).json({
      message: "Signup Successful",
      success: true,
      // jwtToken,
      email,
      name: savedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    const isEqualPass = await bcrypt.compare(password, user.password);
    if (!isEqualPass) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// module.exports.logout = async (req, res) => {};
