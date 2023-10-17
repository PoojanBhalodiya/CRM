const router = require("express").Router();
const authCtrl = require("../controller/auth-ctrl");

router.post("/reset-password", authCtrl.resetPassword);

router.post("/update-user", authCtrl.updateUser);
module.exports = router;
