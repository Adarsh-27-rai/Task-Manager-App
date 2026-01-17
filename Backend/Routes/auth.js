const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../Models/user")
const authMiddleware = require("../Middleware/authMiddleware")

const router = express.Router()

router.post("/signup", async (req,res) => {
    const { name,email,password } = req.body;
    const existingUser = await User.findOne({ email })
    if(existingUser) {
        return res.status(400).json({message: "This User already exist"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword});
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.json({ token });
})

router.post("/login", async (req,res) => {
    const { email,password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({message: "Invalid credentials email"});
    }

    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) {
        return res.status(400).json({message: "Invalid credentials password"});
    }

    const token = jwt.sign({ id: user._id },process.env.JWT_SECRET,{ expiresIn: "7d" });
    res.json({ token });
})

router.get("/me", authMiddleware, async (req,res) => {
    const user = await User.findOne({_id: req.user})
    res.json(user)
})


module.exports = router;