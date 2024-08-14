const Mindfull = require('../../models/mindfull')

module.exports = {
    index,
    show,
    create,
    displayAllByUser,
    delete: deleteOne,
    update
}

async function index(req, res) {
    const mindfull = await Mindfull.find({});
    res.status(200).json(mindfull);
}

async function show(req, res) {
    const mindfull = await Mindfull.findById(req.params.id);
    res.status(200).json(mindfull);
}

async function create(req, res) {
    const mindfull = await Mindfull.create(req.body);
    mindfull.save()
    res.status(201).json(mindfull);

}

async function displayAllByUser(req, res) {
    const mindfull = await Mindfull.find({ email: req.params.name })
    res.status(200).json(mindfull)
}
async function deleteOne(req, res) {
    const deleteMindfull = await Mindfull.findByIdAndRemove(req.params.id);
    res.status(201).json(deleteMindfull);

}

async function update(req, res) {
    const updatedMindfull = await Mindfull.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedMindfull);

}