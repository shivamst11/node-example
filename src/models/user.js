const mongoose = require('mongoose');
const salt = 10;
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 10,
    },
    token: {
      type: String,
      default: null,
    },
    files: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'File',
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(salt, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods = {
  comparepassword: async function (password) {
    try {
      const isMatch = await bcrypt.compare(password, this.password);
      return isMatch;
    } catch (err) {
      throw new Error(err);
    }
  },
};

const User = mongoose.model('User', userSchema);

module.exports = User;
