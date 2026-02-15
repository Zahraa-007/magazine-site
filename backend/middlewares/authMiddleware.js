import { ContactMessage } from "../models/contact.js";

export const createContact = async (req, res) => {
  try {
    const { user_id, name, subject, message } = req.body;
    const newMessage = await ContactMessage.create({ user_id, name, subject, message });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
