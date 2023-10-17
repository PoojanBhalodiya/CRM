const User = require("../modal/user-modal");
const jwt = require("jsonwebtoken");
const authCtrl = {
  registerUser: async (req, res) => {
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
          // Function to check if a token is expired
          function isTokenExpired(token) {
            try {
              const decoded = jwt.verify(token, "UNSAFE_STRING");
              const currentTimestamp = Math.floor(Date.now() / 1000);

              // Check if the token's expiration time (in seconds since epoch) is in the past
              if (decoded.exp < currentTimestamp) {
                return true; // Token has expired
              }

              return false; // Token is still valid
            } catch (error) {
              return true; // Token is invalid or has expired
            }
          }
          const token = jwt.sign(
            { user_id: user._id, email },
            "UNSAFE_STRING",
            {
              expiresIn: "24h",
            }
          );

          user.token = token;
          const savedUser = await user.save();

          if (isTokenExpired(token)) {
            return res.status(401).json({
              statusCode: 401,
              responseData: {
                status: false,
                message: "Token has expired",
              },
            });
          }
          // Set the token in the response header
          res.set("Authorization", `Bearer ${token}`);
          res.status(200).json({
            statusCode: 1,
            responseData: {
              status: true,
              message: "User is register",
              user: user.token,
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
  },
  loginUser: async (req, res) => {
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
          // Function to check if a token is expired
          function isTokenExpired(token) {
            try {
              const decoded = jwt.verify(token, "UNSAFE_STRING");
              const currentTimestamp = Math.floor(Date.now() / 1000);

              // Check if the token's expiration time (in seconds since epoch) is in the past
              if (decoded.exp < currentTimestamp) {
                return true; // Token has expired
              }

              return false; // Token is still valid
            } catch (error) {
              return true; // Token is invalid or has expired
            }
          }
          const token = jwt.sign(
            { user_id: user._id, email },
            "UNSAFE_STRING",
            {
              expiresIn: "24h",
            }
          );
          user.token = token;

          if (isTokenExpired(token)) {
            return res.status(401).json({
              statusCode: 401,
              responseData: {
                status: false,
                message: "Token has expired",
              },
            });
          }
          res.set("Authorization", `Bearer ${token}`);
          // Password is correct
          return res.status(200).json({
            statusCode: 200,
            responseData: {
              status: true,
              message: "User is logged in",
              user: user,
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
  },

  resetPassword: async (req, res) => {
    const email = req.body.email;
    const mobileNo = req.body.mobileNo;

    if (!email || !mobileNo) {
      return res.status(400).json({
        statusCode: 400,
        responseData: {
          status: false,
          message: "Email and mobileNo are required",
        },
      });
    }

    // Check if a user with the provided email or mobileNo exists
    const user = await User.findOne({ email, mobileNo });

    if (user) {
      const generatePassword = () => {
        const charset = "0123456789";
        let Password = "";

        for (let i = 0; i < 9; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          Password += charset.charAt(randomIndex);
        }
        return Password;
      };

      const newPassword = generatePassword(); // Generate a new password
      // Update the user's password here if needed

      return res.status(200).json({
        statusCode: 200,
        responseData: {
          status: true,
          message: "User reset Password",
          Password: newPassword,
        },
      });
    } else {
      // User with the provided email or mobileNo does not exist
      return res.status(200).json({
        statusCode: 1,
        responseData: {
          isUserValid: false,
        },
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { email, newPassword, newFirstName } = req.body;

      if (!email || (!newPassword && !newFirstName)) {
        return res.status(400).json({
          statusCode: 400,
          responseData: {
            status: false,
            message:
              "Email and at least one of the fields (newPassword or newFirstName) are required",
          },
        });
      }

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(404).json({
          statusCode: 404,
          responseData: {
            status: false,
            message: "Email does not exist",
          },
        });
      }

      if (newPassword) {
        existingUser.password = newPassword;
      }

      if (newFirstName) {
        existingUser.firstName = newFirstName;
      }

      const updatedUser = await existingUser.save();

      return res.status(200).json({
        statusCode: 200,
        responseData: {
          status: true,
          message: "User profile updated successfully",
          user: updatedUser,
        },
      });
    } catch (error) {
      console.error("Error during user update:", error);
      res.status(500).json({
        statusCode: 500,
        responseData: {
          status: false,
          message: "Internal Server Error",
        },
      });
    }
  },
};
module.exports = authCtrl;
