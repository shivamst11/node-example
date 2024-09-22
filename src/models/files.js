const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
  thumbnailUrl: String,
  name: String,
  entries: [String],
});

module.exports = mongoose.model('File', fileSchema);
