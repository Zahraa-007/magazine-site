import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

// create user (register)
export const createUser = async (req, res) => {
    try {
        const { name, email, password_hash, role, bio, whatsapp_number } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "البريد الإلكتروني مسجل بالفعل" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password_hash, 10);

        const user = await User.create({
            name,
            email,
            password_hash: hashedPassword,
            role: role || "guest",
            bio,
            whatsapp_number,
            is_verified: false,
            membership_type: "free"
        });

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            message: "تم إنشاء الحساب بنجاح"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// login user
export const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "بريد إلكتروني أو كلمة مرور غير صحيحة" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "بريد إلكتروني أو كلمة مرور غير صحيحة" });
        }

        // Check role
        if (role && user.role !== role && user.role !== "admin") {
            return res.status(403).json({ error: "دور المستخدم غير متطابق" });
        }

        // Update last login
        await user.update({ last_login: new Date() });

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            is_verified: user.is_verified,
            whatsapp_number: user.whatsapp_number,
            bio: user.bio,
            avatar: user.avatar,
            affiliation: user.affiliation,
            website: user.website,
            profile_image_url: user.profile_image_url,
            message: "تم تسجيل الدخول بنجاح"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// read all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password_hash"] }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// read a user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ["password_hash"] }
        });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update a user
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "المستخدم غير موجود" });
        
        // Log update attempt
        console.log(`Updating user ${req.params.id} with data:`, Object.keys(req.body));
        
        // If password is being updated, hash it
        if (req.body.password_hash) {
            req.body.password_hash = await bcrypt.hash(req.body.password_hash, 10);
        }

        // Update only allowed fields
        const allowedFields = ['name', 'whatsapp_number', 'bio', 'avatar', 'affiliation', 'website', 'profile_image_url', 'password_hash'];
        const updateData = {};
        
        for (const field of allowedFields) {
            if (field in req.body) {
                updateData[field] = req.body[field];
            }
        }

        // Save avatar/profile image to both fields for compatibility
        if (updateData.avatar && !updateData.profile_image_url) {
            updateData.profile_image_url = updateData.avatar;
        }

        await user.update(updateData);
        
        console.log(`User ${req.params.id} updated successfully`);
        
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            whatsapp_number: user.whatsapp_number,
            bio: user.bio,
            avatar: user.avatar,
            affiliation: user.affiliation,
            website: user.website,
            message: "تم تحديث البيانات بنجاح"
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message || "خطأ في تحديث البيانات" });
    }
};

// delete a user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        await user.destroy();
        res.json({ message: "تم حذف المستخدم بنجاح" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};