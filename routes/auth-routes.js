const router = require("express").Router();
const authCtrl = require("../controller/auth-ctrl");


router.get("/login", authCtrl.loginUser);

router.get("/register", (req, res) => {
  res.send("you have register page");
});

router.post("/registeruser", authCtrl.registerUser);



router.post("/auth/forget-password", authCtrl.resetPassword);
router.post("/auth/update-user", authCtrl.updateUser);
router.get("*", (req, res) => {
  res.send("invalied router");
});

module.exports = router;
