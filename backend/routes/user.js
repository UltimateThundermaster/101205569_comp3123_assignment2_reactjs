const router = require("express").Router()
const User = require("../model/User")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

router.post('/signup', async (req, res) => {
    const {username, email, password} = req.body
    try {
        const exitingUser = await User.find({$or: [{username: username}, {email: email}]})
        if(exitingUser.length > 0) {
            return res.status(400).json({message: 'Username/Email already exits'})
        }
        const user = new User({username, email, password})
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save()
        res.status(201).json({status: true, message: "User created successfully"})
    }catch(err) {
        res.status(500).json({status: false, message: err.message})
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(user) {
            const validPassword = await bcrypt.compare(password, user.password)
            if(!validPassword) {
                return res.status(401).json({status: false, message: "Invalid email or password"})
            }
            const jwtSecretKey = "secret_key"
            const token = jwt.sign({userId: user._id, username: user.username, email: user.email}, jwtSecretKey);
            return res.status(200).json({status: true, username: user.username, message: "User logged in successfully", jwt_token: token})
        }
        res.status(404).json({status: false, message: "User not found"})
    }catch(err) {
        res.status(500).json({status: false, message: err.message})
    }
})


module.exports = router