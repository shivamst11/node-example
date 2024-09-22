const Pool = require('../models/pool');

const getPool = async (req, res) => {
  res.status(200).json(res.paginatedResult);
};

module.exports = { getPool };
