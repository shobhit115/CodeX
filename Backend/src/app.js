import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Security Headers
app.use(helmet());

// Request Logging
app.use(morgan("dev"));

// Rate Limiting (limit repeated requests to public APIs and/or endpoints)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api", limiter);

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Compression for better performance
app.use(compression());


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import healthcheckRouter from "./routes/healthcheck.routes.js";

// routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter);

// error handling middleware (should be added after all routes)
app.use(errorHandler);

export default app;
