// userController.js
const User = require("../models/user");

const userController = {};

userController.loginSignUp = async (req, res) => {
  const { username, password, action } = req.body;

  try {
    if (action === "login") {
      const user = await User.findOne({ username, password });

      if (user) {
        res.send({ success: true, message: "Login successful" });
      } else {
        res.json({ success: false, message: "Invalid username or password" });
      }
    } else if (action === "register") {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.json({
          success: false,
          message: "User already exists. Please choose another username.",
        });
      }

      const newUser = new User({ username, password });
      await newUser.save();

      res.json({
        success: true,
        message: "Registration successful. Please login.",
      });
    } else {
      res.json({ success: false, message: "Invalid action" });
    }
  } catch (error) {
    console.error("Error during login or registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
// ========================================

userController.userListController = async (req, res, next) => {
  try {
    const param = req.query.param; // Get the 'param' from the query parameters

    if (param) {
      const userToShow = await User.findOne({ username: param });

      if (userToShow) {
        // If user found, render the userList page with only that user's data
        res.render("admin/userList.ejs", { users: [userToShow] });
      } else {
        // If user not found, render an empty userList
        res.render("admin/userList.ejs", { users: [] });
      }
    } else {
      // If no parameter is provided, render the entire user list
      const users = await User.find();
      res.render("admin/userList.ejs", { users });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
