import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import businessRoutes from "./routes/business.routes.js";
import customerRoutes from "./routes/customer.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "ClinicFlow WhatsApp API is running",
  });
});

app.get("/health", async (_req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/api/businesses", businessRoutes);
app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});