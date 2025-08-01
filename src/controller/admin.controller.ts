import { NextFunction } from "express";
import Admin from "../models/admin.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export const handleRegisterController = async (req: Request, res : Response) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaa", req.body);
  const user = req.body;

  try {
      const Existadmin = await Admin.findOne({user.email});

      if(!Existadmin) {
          const admin = await Admin.create({email , password});

          console.log("Admin created successfully");

          return res.status(200).json();
      }

  }catch (err) {
      console.error("Error on register controller", err);
  }
};

export const handleLoginController = async (req : Request, res : Response, next : NextFunction) => {
    const user = req.body;

    try {
        const admin = await Admin.findOne({ email : user.email });
        if(!admin) {
            return res.status(404).json({message : "Admin not found"});
        }
        const isMatch = await bcrypt.compare(user.password, admin.password);
        if(!isMatch) {
            return res.status(400).json({message : "Invalid password"});
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const token = generateToken(user.id);
        res.json({ token });

    } catch(err) {
        console.log("Error in admin login controller", err);
    }
};
