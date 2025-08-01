import { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import Book from "../models/book.model";

export const handleBookMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price } = req.body;

  try {
    const ExistingBook = await Book.findOne({ name });

    if (ExistingBook)
      return res.status(409).json({ message: "Book already Exist" });

    const book = await Book.create({ name, price });
    console.log("Book created :", book);
    res.status(201).json({ message: "Book created successfully" });
    next();
  } catch (err) {
    console.log("Error while book creation : ", err);
  }
};

export const handleBookGetMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const id = req.params.id;

  try {
    const ExistBook = await Book.findByIdAndUpdate(
       id ,
      { $inc: { likes: 1 } },
      { new: true }
    );
    console.log("Exist Book :", ExistBook);
    if (!ExistBook) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message : "Book found successfully", data : ExistBook });
    next(); 

  } catch (err) {
    console.error("Error while book get : ", err);
  }
};

export const handleUpdateBookMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  

  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body ,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", data: book });


  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
