import { AdminNotification } from "../models/AdminNotification.js";
//import { User } from "../models/User.js";

export const createNotification = async (req, res) => {
  try {
    const { user_id, type } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const notification = await AdminNotification.create({ user_id, type });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await AdminNotification.findAll({
      include: [{ model: User, attributes: ["id", "name", "email"] }],
      order: [["created_at", "DESC"]],
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await AdminNotification.findByPk(id);
    if (!notification) return res.status(404).json({ error: "Notification not found" });

    notification.status = "read";
    await notification.save();

    res.json({ message: "Notification marked as read", notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
