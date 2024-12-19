const mongoose = require('mongoose')
const User = require("../models/userModel");

const announceModel = new mongoose.Schema ({
  author: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  type: { 
    type: String, 
    required: true 
  },
  brand: { 
    type: String, 
    required: true 
  },
  model: { 
    type: String, 
    required: true 
  },
  km: { 
    type: Number, 
    required: true 
  },
  year: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  }
});

const Announce = mongoose.model("announces", announceModel);
module.exports = Announce;