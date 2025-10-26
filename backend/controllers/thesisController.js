import { Thesis } from '../models/thesis.js';

// Create a new thesis
export const createThesis = async (req, res) => {
  try {
    const newThesis = await Thesis.create(req.body);
    res.status(201).json(newThesis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create thesis', error });
  }
};

// Get all thesis
export const getAllThesis = async (req, res) => {
  try {
    const theses = await Thesis.findAll();
    res.json(theses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch theses', error });
  }
};
