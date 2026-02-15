import { Categories } from '../models/category.js';

// CREATE a new category
export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await Categories.create({ name, description });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// READ all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// READ one category by ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Categories.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE category by ID
export const updateCategory = async (req, res) => {
    try {
        const category = await Categories.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        await category.update(req.body);
        res.json({ message: "Category updated successfully", category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE category by ID
export const deleteCategory = async (req, res) => {
    try {
        const category = await Categories.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        await category.destroy();
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
