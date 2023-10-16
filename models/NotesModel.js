const mongoose = require('mongoose');

// Define the Note schema
const noteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        // required: true
    },
    noteDescription: {
        type: String,
        // required: true
    },
    priority: {
        type: String,
        enum: ['HIGH', 'LOW', 'MEDIUM'],
        default: 'MEDIUM' // You can set a default priority if needed
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    }
});

// Create a model for the Note schema
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
