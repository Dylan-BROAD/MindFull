const Mindfull = require('../../models/mindfull');

module.exports = {
    index,
    show,
    create,
    displayAllByUser,
    delete: deleteOne,
    update,
};

// Get All Mindfull Entries for the Authenticated User
async function index(req, res) {
    try {
        const mindfull = await Mindfull.find({ user: req.user._id })
            .populate('user')
            .sort({ createdAt: 1 })
            .exec();

        if (!mindfull) {
            throw new Error('An error occurred while fetching mindfull entries.');
        }

        res.status(200).json(mindfull);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching mindfull entries.' });
    }
}

// Get a Specific Mindfull Entry by ID for the Authenticated User
async function show(req, res) {
    try {
        const mindfull = await Mindfull.findOne({ _id: req.params.id, user: req.user._id })
            .populate('user')
            .exec();

        if (!mindfull) {
            throw new Error('An error occurred while fetching the mindfull entry.');
        }

        res.status(200).json(mindfull);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the mindfull entry.' });
    }
}

// Create a New Mindfull Entry
async function create(req, res) {
    try {
        const data = {
            user: req.user._id,
            title: req.body.title,
            journal: req.body.journal,
            goals: req.body.goals,
            songName: req.body.songName,
            moodRating: req.body.moodRating,
        };

        const savedMindfull = await Mindfull.create(data);

        if (!savedMindfull) {
            throw new Error('An error occurred while creating the mindfull entry.');
        }

        res.status(201).json(savedMindfull);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the mindfull entry.' });
    }
}

// Display All Mindfull Entries by User's Name (or Email)
async function displayAllByUser(req, res) {
    try {
        const mindfull = await Mindfull.find({ email: req.params.name }) // Adjust this line based on how you determine the user
            .populate('user')
            .exec();

        if (!mindfull) {
            throw new Error('An error occurred while fetching mindfull entries for the user.');
        }

        res.status(200).json(mindfull);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching mindfull entries for the user.' });
    }
}

// Delete a Mindfull Entry
async function deleteOne(req, res) {
    try {
        const mindfull = await Mindfull.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!mindfull) {
            return res.status(404).json({ error: 'Mindfull entry not found or you do not have permission to delete it.' });
        }

        res.status(200).json({ message: 'Mindfull entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the mindfull entry.' });
    }
}

// Update a Mindfull Entry
async function update(req, res) {
    try {
        const mindfull = await Mindfull.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!mindfull) {
            throw new Error('An error occurred while updating the mindfull entry.');
        }

        Object.assign(mindfull, req.body);
        await mindfull.save();

        res.status(200).json(mindfull);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the mindfull entry.' });
    }
}
