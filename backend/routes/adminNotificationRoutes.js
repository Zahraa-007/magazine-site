import express from "express";
import { createNotification, getAllNotifications, markAsRead } from "../controllers/adminNotificationController.js";

const router = express.Router();

router.post("/", createNotification);
router.get("/", getAllNotifications);
router.put("/:id/read", markAsRead);

export default router;
