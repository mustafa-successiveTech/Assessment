import { Request, Response, NextFunction } from "express";
import Student from "../models/student.model";

export const handleNewStudentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, age, grade, email } = req.body;
  try {
    const ExistStudent = await Student.findOne({ email });

    if (ExistStudent)
      return res.status(409).json({ message: "Student already exists" });

    const student = await Student.create({name, age, grade, email});
    return res.status(201).json({ message: "Student created successfully", student });

  } catch (err) {
    console.error("Error in handlingStudentCreation", err);
  }
};

export const handleUniqueStudentController = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const { id } = req.params;

        const student = await Student.findById(id);

        if(!student) return res.status(404).json({ message : "Student not found"});

        console.log("Student fetched :", student);

        return res.status(200).json({ message : "Student fetched successfully", data : student});
    } catch(err) {
        console.error("Error in handlingUniqueStudent", err);
    }
};

export const handleUpdateStudentController = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const { id } = req.params;

        const student = await Student.findOneAndReplace(
            { _id: id },
            req.body,
        );

        if(!student) return res.status(401).json({ message : "Student not found"});

        res.status(200).json({ message : "User updated successfully"});
    } catch(err) {
        console.error("Error while updating student", err);
    }
};

export const handleDeleteStudent = async (req :Request, res : Response, next : NextFunction) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);
        if(!student) return res.status(404).json({ message : "Student not found"});
        res.status(200).json({ message : "Student deleted successfully"});
    } catch(err) {
            console.error("Error in handling delete student", err);
    }
};

export const handleQueryStudentController = async (req : Request, res : Response, next : NextFunction) => {
    try{ 
        const minAge = req.query.minAge;
        const maxAge = req.query.maxAge; 
        
        const filterStudents = await Student.find({
            age : { $gte : minAge, $lte : maxAge }
        });
        console.log("Filtered-Students :", filterStudents);
        res.status(200).json({ message : "Students fetched successfully", data : filterStudents});
    }
    catch(err) {
        console.error("Error in handling query student", err);
    }
};



