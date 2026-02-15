import express from "express";
import cors from "cors";
import { sequelize } from "./config/db.js";
import thesisRoutes from './routes/thesisRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import contactRoutes from "./routes/contactRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import complaintAttachmentRoutes from "./routes/complaintAttachmentRoutes.js";
import adminNotificationRoutes from "./routes/adminNotificationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import articleRoutes from './routes/articles.js';
import analyticsRoutes from './routes/analyticsRoutes.js';


const app = express();
app.use(express.json());

// Enhanced CORS Configuration - Fixed for credentials
const allowedOrigins = [
    'http://localhost:8000',
    'http://localhost:8080', 
    'http://localhost:3000', 
    'http://127.0.0.1:5500',
    'http://127.0.0.1:8000'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl requests, etc)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, true); // Allow all for now - can be restricted later
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Role', 'X-Requested-With'],
    optionsSuccessStatus: 200
}));

// Additional CORS headers for all requests
app.use((req, res, next) => {
    const origin = req.headers.origin;
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-User-Role, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use('/api/thesis', thesisRoutes);
app.use('/api/comments', commentRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/complaint-attachments", complaintAttachmentRoutes);
app.use("/api/admin-notifications", adminNotificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/analytics', analyticsRoutes);



app.use("/api", contactRoutes);
app.get("/", (req, res) => {
    res.send("Magazine Backend Running ✅");
});

export default app;





