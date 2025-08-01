import jwt from 'jsonwebtoken';

const secret_key = process.env.JWT_SECRET || "MUSTAFA";

export const generateToken = (user_id : string) => {
    return jwt.sign({user_id}, secret_key, {expiresIn : "1h"});
};

export const verifyToken = (token : string) => {
    return jwt.verify(token, secret_key);
}