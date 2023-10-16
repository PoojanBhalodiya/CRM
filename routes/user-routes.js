const router = require("express").Router();
const authCtrl = require("../controller/auth-ctrl");

router.post("/forget-password", authCtrl.forgotPassword);

router.post("/update-user", authCtrl.updateUser);
module.exports = router;
