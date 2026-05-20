import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { UserApp } from "./APIs/UserAPI.js";
import cors from "cors";
import path from "path";

config();

const app = exp();

// CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://user-management-app-hjy4.vercel.app"
  ]
}));

// body parser
app.use(exp.json());

// API routes
app.use("/user-api", UserApp);

// serve React build
app.use(exp.static("dist"));

app.get( (req, res) => {
  res.sendFile(path.resolve("dist", "index.html"));
});

// connect DB
async function connectDB() {
  try {
    await connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
      console.log(`server on port ${port}`);
    });

  } catch (err) {
    console.log("err in DB connection :", err);
  }
}

connectDB();

// error middleware
app.use((err, req, res, next) => {

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format"
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value"
    });
  }

  res.status(500).json({
    message: "Internal Server Error"
  });

});
