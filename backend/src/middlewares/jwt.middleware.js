import jwt from 'jsonwebtoken';
import User from "../users/userModel.js";
import { ApiError } from '../utils/ApiError.js';

const authenticateJWT = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
            const userId = decoded.id; 


            const user = await User.findById(userId);
            if (!user) {
                return next(new ApiError(404, "User not found")); 
            }

            req.user = user;
            next(); 
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired' }); 
            }
            console.error(err);
            return next(new ApiError(403, "Forbidden Access - Token Verification Failed")); 
        }
    } else {
        return next(new ApiError(401, "Token Missing - Unauthorized")); 
    }
};

export default authenticateJWT;
