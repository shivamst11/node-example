const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://localhost:27017/students';

// const client = new MongoClient(mongoUrl);

// const getData = async () => {
//   try {
//     await client.connect();

//     const db = client.db('students');

//     const collection = db.collection('marks');

//     const result = await collection.find({}).toArray();
//     console.log(result);

//     const output = await collection.insertOne({
//       name: 'karan',
//       rollNumber: '3',
//       math: 122,
//       english: 223,
//       science: 525,
//     });

//     console.log('insert id', output.insertedId);
//   } finally {
//     await client.close();
//   }
// };

// getData();

// Mongoose

// dbconfig.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const connection = await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // eslint-disable-next-line no-console
  console.log(`MongoDB Connected: ${connection.connection.host}`);
};

// module.js

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  math: {
    type: Number,
    required: true,
  },
  english: {
    type: Number,
    required: true,
  },
  science: {
    type: Number,
    required: true,
  },
});

const Student = mongoose.model('marks', studentSchema);

module.exports = Student;

// Example usage
(async () => {
  await connectDB();

  // Create a new student document
  const newStudent = new Student({
    name: 'Rahuls',
    rollNumber: '1',
    math: 12,
    english: 23,
    science: 55,
  });

  try {
    const savedStudent1 = await newStudent.save();
    console.log('Student saved:', savedStudent1);

    const foundStudents = await Student.find({});
    console.log('Students found in students DB:', foundStudents);

    // Update a document in 'students' database
    await Student.updateMany({ name: 'Rahuls' }, { $set: { math: 110 } });
    await Student.updateMany({ name: 'Rahuls' }, { math: 100 });

    const updatedStudent1 = await Student.findByIdAndUpdate(
      savedStudent1._id,
      { math: 95 },
      { new: true }
    );
    console.log('Student updated in students DB:', updatedStudent1);

    // Delete a document in 'students' database
    await Student.deleteMany({ name: 'karan' });
    const deletedStudent1 = await Student.findByIdAndDelete(savedStudent1._id);
    console.log('Student deleted in students DB:', deletedStudent1);

    await Student.find({ name: 'Rahuls' });

    // Optionally close connections
  } catch (error) {
    console.error('Error saving student:', error);
  }

  // Close the connection
  mongoose.connection.close();
})();
