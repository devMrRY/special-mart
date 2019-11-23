const mongoose = require("mongoose");
const validator = require("validator");
const User = mongoose.Schema;

const userSchema = new User({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email not valid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('password cannot contain "password"');
      }
    }
  },
  token: {
    type: String,
    trim: true,
    default: ""
  }
});

const user = mongoose.model("user", userSchema);

module.exports = user;
