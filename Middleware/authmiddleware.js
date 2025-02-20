import jwt from 'jsonwebtoken'
import Company from '../models/Company.js'
import User from '../models/User.js'

export const protectCompany=async(req,res,next)=>
{
   const token=req.headers.token

   if(!token)
   {
       return res.json({success:false,message:"Not authorized"})
   }
   try {
       const decoded=jwt.verify(token,process.env.JWT_SECRET)
       req.company=await Company.findById(decoded.id).select('-password')

       next()
   } catch (error) {
       res.json({success:false,message:error.message})
   }
}
export const protectUser=async(req,res,next)=>
    {
       const token=req.headers.token
    
       if(!token)
       {
           return res.json({success:false,message:"Not authorized"})
       }
       try {
           const decoded=jwt.verify(token,process.env.JWT_SECRET)
           req.user=await User.findById(decoded.id).select('-password')
    
           next()
       } catch (error) {
           res.json({success:false,message:error.message})
       }
    }

    export const authMiddlewares = async (req, res, next) => {
        try {
          const token = req.header('Authorization').replace('Bearer ', '');
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
      
          if (!user) {
            throw new Error();
          }
      
          req.token = token;
          req.user = user;
          next();
        } catch (error) {
          res.status(401).json({ success: false, message: 'Please authenticate' });
        }
      };

      export const verifyToken = async (req, res, next) => {
        console.log("Authorization Header:", req.headers.authorization);
    
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            console.log("No token found, returning 401");
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token:", decoded);
    
            req.user = decoded;
            next();
        } catch (error) {
            console.log("Invalid token:", error.message);
            res.status(403).json({ success: false, message: 'Invalid token' });
        }
    };
    