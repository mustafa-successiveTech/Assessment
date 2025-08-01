import express from "express";
import dotenv from "dotenv";
import { handleBookGetMiddleware, handleBookMiddleware, handleUpdateBookMiddleware } from "./middleware/book.middleware";
import helmet from 'helmet';
import { mongoDB } from "./config/db";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
  res.send({ message: "Hello from server" });
});

app.post('/book', handleBookMiddleware);
app.get('/get-book/:id', handleBookGetMiddleware);
app.patch('/update/:id', handleUpdateBookMiddleware);

export default app;
