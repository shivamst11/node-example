const File = require('../models/files');
const Profile = require('../models/profile');

const getFiles = async (req, res) => {
  try {
    const files = await File.find({ _id: { $in: req.user.files } })
      .limit(5)
      .lean()
      .exec();

    const filesWithProfiles = await Promise.all(
      files.map(async (file) => {
        const entriesWithProfiles = await Promise.all(
          file.entries.map(async (entryId) => {
            console.log(entryId);
            const profile = await Profile.find({ user: entryId }).exec();
            return { entryId, profile };
          })
        );
        return { ...file, entries: entriesWithProfiles };
      })
    );

    res.json({ files: filesWithProfiles });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getFiles };
