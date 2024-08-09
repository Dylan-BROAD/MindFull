const Mindfull = require('../../models/mindfull')

module.exports = {
  index,
  show,
  
}

async function index(req, res) {
  const mindfull = await Mindfull.find({});
  res.status(200).json(mindfull);
}

async function show(req, res) {
  const mindfull = await Mindfull.findById(req.params.id);
  res.status(200).json(mindfull);
}
