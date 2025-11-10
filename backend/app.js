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


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/thesis', thesisRoutes);
app.use('/api/comments', commentRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/complaint-attachments", complaintAttachmentRoutes);
app.use("/api/admin-notifications", adminNotificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use('/api/articles', articleRoutes);



app.use("/api", contactRoutes);
app.get("/", (req, res) => {
    res.send("Magazine Backend Running ✅");
});

await sequelize.sync({ force: true });

export default app;





