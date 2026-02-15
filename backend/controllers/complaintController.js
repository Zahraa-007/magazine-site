import { Complaint } from "../models/complaint.js";

// add new complaint
export const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);
    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// display all complaint
export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.findAll();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// show complaint by id
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findByPk(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// replay  or update the complaint
export const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByPk(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    await complaint.update(req.body);
    res.status(200).json({ message: "Complaint updated successfully", complaint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete the complaint
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByPk(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    await complaint.destroy();
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
