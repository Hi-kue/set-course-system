import express from "express";
import authRouter from "./routes/auth.route.js";
import courseRouter from "./routes/course.route.js";
import enrollmentRouter from "./routes/enrollment.route.js";
import healthRouter from "./routes/health.route.js";
import studentRouter from "./routes/student.route.js";
import userRouter from "./routes/user.route.js";
import { Middleware } from "./middleware.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ANCHOR: Middleware Routes
app.use(Middleware.notFound);
app.use(Middleware.errorHandler);
app.use(Middleware.unknownEndpoint);

// ANCHOR: Routes for REST API Consumption
app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/enrollments", enrollmentRouter);
app.use("/health", healthRouter);
app.use("/api/students", studentRouter);
app.use("/api/users", userRouter);

// ANCHOR: Start the Server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

export default app;
