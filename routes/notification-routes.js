const router = require("express").Router();
const notifyCtrl = require("../controller/notification-ctrl");

router.post("/create-notification", notifyCtrl.createNotification);
router.post("/mark-notification-read/:id", notifyCtrl.markAllNotificationsAsRead);
router.get("/get-notifications/:id", notifyCtrl.getNotification);

module.exports = router;
