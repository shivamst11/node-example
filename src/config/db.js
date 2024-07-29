const mongoose = require('mongoose');

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URL, {
    dbName: 'pool',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${connection.connection.host}`);
};

module.exports = connectDB;
