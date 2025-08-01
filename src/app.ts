import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import { handleStudentMiddleware } from "./middleware/student.middleware";
import { handleDeleteStudent, handleNewStudentController, handleQueryStudentController, handleUniqueStudentController, handleUpdateStudentController } from "./controller/student.controller";
import { verifyToken } from "./utils/jwt";
import { handleRegisterMiddleware } from "./middleware/admin.middleware";
import { handleRegisterController } from "./controller/admin.controller";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
  res.send({ message: "Hello from Student Management API" });
});

app.get('/students',verifyToken, handleStudentMiddleware);

app.post('/create-student',verifyToken, handleNewStudentController);

app.get('/students/:id', verifyToken, handleUniqueStudentController);

app.put('/update-student/:id', verifyToken, handleUpdateStudentController);

app.delete('/delete-student/:id', verifyToken, handleDeleteStudent);

app.get('/student-by-query', verifyToken, handleQueryStudentController);

app.post('/register', handleRegisterController);

// app.post('/login', handleLoginController);

export default app;
