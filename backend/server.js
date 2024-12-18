import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";

// env variables
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

// cors
app.use(cors());

// global middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/notes", notesRoutes);

// DB connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
