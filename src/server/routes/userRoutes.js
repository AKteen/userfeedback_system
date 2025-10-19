import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import express from 'express'
import generateToken from '../token.js'

const router = express.Router();



router.post('/register', async (req, res) => {
    console.log("register post hit");
    try {
        const { name, email, password, role } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })


        res.status(200).json({ message: "successfully registered", user:  newUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});


router.post('/login', async (req, res) => {

    console.log("login post hit");

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log("user does not exist");
            return res.status(401).json({ message: "user does not exist" });

        }

        const decoded = await bcrypt.compare(password, user.password);
        if (!decoded) {
            console.log("password is incorrect");
            return res.status(401).json({ message: "password is incorrect" });
        }

        const token = generateToken(user);

        const userObj = user.toObject();
        delete userObj.password;


        console.log("logged in");

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
        });

        res.status(200).json({ message: "logged in", user: userObj });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

});


export default router;