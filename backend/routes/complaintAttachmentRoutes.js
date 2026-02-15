import express from "express";
import {
  createAttachment,
  getAttachments,
  getAttachmentsByComplaint,
  deleteAttachment,
} from "../controllers/complaintAttachmentController.js";

const router = express.Router();

router.post("/new", createAttachment);
router.get("/", getAttachments);
router.get("/complaint/:complaint_id", getAttachmentsByComplaint);
router.delete("/:id", deleteAttachment);

export default router;
