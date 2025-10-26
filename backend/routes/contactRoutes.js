import express from "express";
import { createContact, getAllContacts } from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", createContact);
router.get("/contact", getAllContacts);

export default router;
