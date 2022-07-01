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
            return res.status(400).json({ msg: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name, email, password: hashedPassword });
        return res.json(newUser);
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res,next) => {
      try {
        
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          if (!user) {
              return res.status(400).json({ msg: 'User does not exist' });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
              return res.status(400).json({ msg: 'Invalid credentials' });
          }
          const payload = {
              user: {
                  id: user.id
              }
          }
          
         const token= jwt.sign(payload, process.env.JWT_SECRET , { expiresIn: 3600 });
         return res.header('auth-token', token).json({ user });
      } catch (error) {
            next(error);
        
      }

}


export const forgetPassword = async (req, res,next) => {
    try {
        // make sure user exist in database
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }
        const payload = {
            user: {
                id: user.id,
                email: user.email
            }
        }
        
        const secret = process.env.JWT_SECRET + user.password;
       //create token and link valid for 30 minutes
       const token= jwt.sign(payload,secret, { expiresIn: '30m' });

       // create link to reset password
        const link = `http://localhost:4000/auth/reset-password/${user.id}/${token}`;
        
        // send email to user with link
        const mailOptions = {
            from: 'khalid.gamal.hamed@gmail.com',
            to: user.email,
            subject: 'Reset Password',
            html: `<h1>Reset Password </h1>
            <p>Click on the link to reset your password
             link: ${link}
            </p>
            `
        }
        await transport.sendMail(mailOptions);
        return res.json({ msg: 'Email has been sent' });
    } catch (error) {
          next(error);
      
    }
}

//gym123456789

export const validateResetPassword = async (req, res,next) => {

    const { id, token } = req.params;
    try {
    //check if user exist in database
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }
    //check if token is valid
        const secret = process.env.JWT_SECRET + user.password;
        const payload = jwt.verify(token, secret);
        return res.status(200).json({ email: user.email });

    }catch (error) {
        next(error);
    }
}

export const resetPassword = async (req, res,next) => {

    const { id, token } = req.params;
    const { password } = req.body;
    try {
    //check if user exist in database
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }
    //check if token is valid
        const secret = process.env.JWT_SECRET + user.password;
        const payload = jwt.verify(token, secret);
    
    //update password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        await user.save();
        return res.json({ msg: 'Password has been updated' });
        

    }catch (error) {
        next(error);
    }
}