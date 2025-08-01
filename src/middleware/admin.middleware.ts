import { Request, Response, NextFunction } from "express";

export const handleRegisterMiddleware = async (req : Request, res: Response, next: NextFunction) => {
  const { name, email, age, grade } = req.body;

  if(!name || !email || !age || !grade) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  next();
}