const mongoose = require('mongoose');
const { Schema, SchemaType } = mongoose;

const poolSchema = new Schema(
  {
    userName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Pool', poolSchema);
