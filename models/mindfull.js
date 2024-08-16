const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mindfullSchema = new Schema({
    title: String,
    journal: String,
    goals: String,
    songName: String,
    moodRating: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        default: 10
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assumes you have a User model
        required: true
    }
});

module.exports = mongoose.model('mindfull', mindfullSchema);
