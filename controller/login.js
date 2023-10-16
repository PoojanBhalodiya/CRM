const User = require("../model/userModel");

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      statusCode: 400,
      responseData: {
        status: false,
        message: "Email and password are required",
      },
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      // User with the provided email exists
      if (user.password === password) {
        // Password is correct
        return res.status(200).json({
          statusCode: 200,
          responseData: {
            status: true,
            message: "User is logged in",
          },
        });
      } else {
        // Password is incorrect
        return res.status(400).json({
          statusCode: 400,
          responseData: {
            status: false,
            message: "Password is incorrect",
          },
        });
      }
    } else {
      // User with the provided email does not exist
      return res.status(404).json({
        statusCode: 404,
        responseData: {
          status: false,
          message: "Email does not exist",
        },
      });
    }
  } catch (error) {
    console.error("Error while querying the database:", error);
    // Handle the error appropriately (e.g., send an error response)
    return res.status(500).json({
      statusCode: 500,
      responseData: {
        status: false,
        message: "Internal Server Error",
      },
    });
  }
};

module.exports = loginUser;
