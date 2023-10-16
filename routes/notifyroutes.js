const router = require("express").Router();
const notifyCtrl = require("../controller/notifyctrl")

router.post("/get-notification", notifyCtrl.createNotify);

module.exports = router;
