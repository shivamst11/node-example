const File = require('../models/files');
const Profile = require('../models/profile');
const { s3 } = require('../middleware/fileUpload');
const { randomUUID } = require('crypto');

const getFiles = async (req, res) => {
  try {
    const files = await File.find({ _id: { $in: req.user.files } })
      .limit(5)
      .lean()
      .exec();

    const filesWithProfiles = await Promise.all(
      files.map(async (file) => {
        // Generate a pre-signed URL for the uploaded object
        const urlParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: file.thumbnailUrl,
          Expires: 60 * 60, // URL expiration time in seconds (1 hour)
        };
        const url = s3.getSignedUrl('getObject', urlParams);

        const entriesWithProfiles = await Promise.all(
          file.entries.map(async (entryId) => {
            const profile = await Profile.find({ user: entryId }).exec();
            return { entryId, profile };
          })
        );
        return { ...file, thumbnailUrl: url, entries: entriesWithProfiles };
      })
    );

    res.json({ data: { files: filesWithProfiles } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const uploadFile = async (req, res) => {
  //saving the file upload key in db  ; temporarily using the first file id from user's files array
  const id = req.user.files[0];
  const file = req.file;

  // Fetch the File document from MongoDB
  const fileDoc = await File.findById(id);

  if (!fileDoc) {
    return res.status(400).json({ message: 'No file found in user profile' });
  }

  const imageId = randomUUID();

  const params = {
    Key: imageId,
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    // Upload the file to S3
    const result = await s3.upload(params).promise(); //upload limit is 3mb
    const key = result.key;

    // Update the File document's entries array
    fileDoc.thumbnailUrl = key;
    await fileDoc.save();
    res.status(200).send('File uploaded to S3 successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading file to S3');
  }
};

module.exports = { getFiles: getFiles, uploadFile };
