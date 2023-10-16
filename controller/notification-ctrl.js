const Notification = require("../modal/notification-modal");

const notifyCtrl = {
  // get user id in params
  getNotification: async (req, res) => {
    const userId = req.params.id;

    if (userId) {
      try {
        const notificationData = await Notification.findOne({ userId });

        if (notificationData) {
          res.status(200).json({
            statusCode: 1,
            responseData: {
              status: true,
              message: "Notification details retrieved successfully",
              notifications: notificationData.notifications,
            },
          });
        } else {
          res.status(404).json({
            statusCode: 1,
            responseData: {
              status: false,
              message: "User not found or has no notifications",
            },
          });
        }
      } catch (err) {
        res.status(500).json({
          statusCode: 1,
          responseData: {
            status: false,
            message: err.message,
          },
        });
      }
    } else {
      res.status(400).json({
        statusCode: 1,
        responseData: {
          status: false,
          message: "Please provide a valid user ID",
        },
      });
    }
  },
  // Make a New Notification
  createNotification: async (req, res) => {
    try {
      const userId = req.body.userId;
      let userNotification = await Notification.findOne({ userId });

      if (!userNotification) {
        userNotification = new Notification({
          userId,
          notifications: [],
        });
      }

      const newNotification = {
        title: req.body.title,
        desc: req.body.desc,
        image: req.body.image,
        datetime: req.body.datetime,
      };
      userNotification.notifications.push(newNotification);
      const savedUserNotification = await userNotification.save();
      res.status(200).json({
        statusCode: 1,
        responseData: {
          status: true,
          message: "Notification is created and added to user's record",
          notification: savedUserNotification,
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
  },

  markAllNotificationsAsRead: async (req, res) => {
    const userId = req.body.userId;

    if (userId) {
      try {
        const userNotification = await Notification.findOne({ userId });
        if (userNotification) {
          userNotification.notifications = [];
          await userNotification.save();

          res.status(200).json({
            statusCode: 1,
            responseData: {
              status: true,
              message: "All notifications marked as read (removed)",
            },
          });
        } else {
          res.status(404).json({
            statusCode: 1,
            responseData: {
              status: false,
              message: "User not found or has no notifications",
            },
          });
        }
      } catch (err) {
        res.status(500).json({
          statusCode: 1,
          responseData: {
            status: false,
            message: err.message,
          },
        });
      }
    } else {
      res.status(400).json({
        statusCode: 1,
        responseData: {
          status: false,
          message: "Please provide a valid user ID",
        },
      });
    }
  },
};
module.exports = notifyCtrl;
