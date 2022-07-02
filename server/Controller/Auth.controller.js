import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../Models/User.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


const transport =nodemailer.createTransport({
    service:process.env.SERVICE,

    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASSWORD
    }
    ,
    port:465,
    host : 'smtp.gmail.com',
}
);


export const signup = async (req, res,next) => {
    try {
        
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            
            return res.status(400).json({ status:false,msg: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        try {
            const savedUser = await newUser.save();
            delete savedUser.password;
            return res.status(200).json({status:true,newUser});
        } catch (error) {
            return res.status(400).json({ status:false, msg: 'Something went wrong' });
        }
       
      
       
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res,next) => {
      try {
        
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          if (!user) {
              return res.status(400).json({ status:false,msg: 'User does not exist' });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
              return res.status(400).json({ status:false,msg: 'Invalid credentials' });
          }
          const payload = {
              user: {
                  id: user.id
              }
          }
          
         const token= jwt.sign(payload, process.env.JWT_SECRET , { expiresIn: 3600 });
         return res.header('auth-token', token).json({status:true, user });
      } catch (error) {
            next(error);
        
      }

}
