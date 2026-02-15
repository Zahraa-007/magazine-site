import { ComplaintAttachment } from "../models/complaintAttachment.js";

// add new Attachment
export const createAttachment = async (req, res) => {
  try {
    const attachment = await ComplaintAttachment.create(req.body);
    res.status(201).json({ message: "Attachment uploaded successfully", attachment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all Attachments
export const getAttachments = async (req, res) => {
  try {
    const attachments = await ComplaintAttachment.findAll();
    res.status(200).json(attachments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get by complaint_id
export const getAttachmentsByComplaint = async (req, res) => {
  try {
    const attachments = await ComplaintAttachment.findAll({
      where: { complaint_id: req.params.complaint_id },
    });
    res.status(200).json(attachments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete 
export const deleteAttachment = async (req, res) => {
  try {
    const attachment = await ComplaintAttachment.findByPk(req.params.id);
    if (!attachment) return res.status(404).json({ message: "Attachment not found" });

    await attachment.destroy();
    res.status(200).json({ message: "Attachment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
