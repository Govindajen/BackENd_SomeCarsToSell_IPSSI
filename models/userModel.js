const mongoose = require('mongoose')

const userModel = new mongoose.Schema ({
  username: { 
    type: String, 
    required: true },
  email: { 
    type: String, 
    required: true },
  password: { 
    type: String, 
    required: true },
  createAt: { 
    type: String, 
    required: true }
}
)

const User = mongoose.model("users", userModel);
module.exports = User;