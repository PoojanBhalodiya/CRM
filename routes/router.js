const router = require("express").Router();
const register = require("../controller/register");
const loginUser = require("../controller/login");

router.get("/login", loginUser);

router.get("/register", (req, res) => {
  res.send("you have register page");
});

router.post("/registeruser", register);

router.get("*", (req, res) => {
  res.send("invalied router");
});

module.exports = router;
