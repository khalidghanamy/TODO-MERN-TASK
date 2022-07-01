import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../Models/User.js';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ msg: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser =User.create({ name, email, hashedPassword });
    return res.json(newUser);
}

export const login = async (req, res) => {
      
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
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

}
