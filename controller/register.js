const User = require("../model/userModel");

const registerUser = async (req, res) => {
  if (
    req.body.firstName &&
    req.body.lastName &&
    req.body.mobileNo &&
    req.body.email &&
    req.body.password
  ) {
    const email = req.body.email; // Define the email variable
    const mobileNo = req.body.mobileNo;
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobileNo: req.body.mobileNo,
      email: req.body.email,
      password: req.body.password,
    });
    //   const existingUser = false;
    const existingUser = await User.findOne({ email });
    const existingMobileNo = await User.findOne({ mobileNo });
    if (existingUser || existingMobileNo) {
      // User with the same email or mobile number already exists
      return res.status(400).json({
        statusCode: 1,
        responseData: {
          status: false,
          message: `User with this ${
            existingMobileNo ? "Mobile Number" : "Email"
          } is already registered`,
        },
      });
    } else {
      try {
        const savedUser = await user.save();
        res.status(200).json({
          statusCode: 1,
          responseData: {
            status: true,
            message: "User is created",
            user: savedUser,
          },
        });
      } catch (err) {
        res.status(400).json({
          statusCode: 1,
          responseData: {
            status: false,
            message: err.message,
          },
        });
      }
    }
  } else {
    res.status(502).json({
      statusCode: 1,
      responseData: {
        status: false,
        message: "Please Fill Required Fields",
      },
    });
  }
};

module.exports = registerUser;
