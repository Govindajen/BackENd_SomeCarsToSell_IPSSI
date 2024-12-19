const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const { username, email, password, createAt } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({result: false, error: "Please enter all fields"});
    }
    const hash = await bcrypt.hash(password, 10);
    
    User.findOne({ email: email }).then((user) => {
        if (user) {
            return res.status(400).json({result: false, error: "User already exists"});
        }

        const newUser = new User({
            username,
            email,
            password: hash,
            createAt
        });

        newUser.save().then((newUser) => {
            const token = jwt.sign(
                { id: newUser._id, email: newUser.email, username: newUser.username }, 
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN } 
              );

            token && res.status(200).json({ result: true, token: token, username: newUser.username});
        })
    });
}


const login = async (req, res) => {

    const { email, password } = req.body;


    User.findOne({email}).then((user) => {
        
        if(user == null) {
            return res.status(404).json({ result: false, error: "User does not exist" });
        }
        const hash = bcrypt.compareSync(password, user.password);
        console.log(hash)

        if(hash) {
            const token = jwt.sign(
                { id: user._id, email: user.email, username: user.username }, 
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN } 
              );

            res.status(200).json({ result: true, token: token , username: user.username});

        } else {
            res.status(404).json({ result: false, error: "Login failed" });
        }
    })  
}





module.exports = {
    registerUser,
    login
  };
  