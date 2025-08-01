import { NextFunction, Request, Response } from "express";
import Student from "../models/student.model";

export const handleStudentMiddleware = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const sortBy = (req.query.sortBy as string) || "createdAt";
    const order = (req.query.order as string) === "desc" ? -1 : 1;

    const skip = (page - 1) * limit;

    const students = await Student.find()
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    const total = await Student.countDocuments();

    res.status(200).json({
      total,
      page,
      limit,
      data: students,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error });
  }
};


