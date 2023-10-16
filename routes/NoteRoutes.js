const express = require('express');
const router = express.Router();
const noteModel = require('../models/NotesModel');

// Create a new Note
router.post('/notes', (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).json({
            message: "Note content can not be empty"
        });
    }

    // Create a new note
    const note = new noteModel({
        content: req.body.content

    });
   

    // Save the note to the database
    note.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the note."
            });
        });
});

// Retrieve all Notes
router.get('/notes', (req, res) => {
    // Retrieve all notes from the database
    noteModel.find()
        .then(notes => {
            res.json(notes);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
});

// Retrieve a single Note with noteId
router.get('/notes/:noteId', (req, res) => {
    // Retrieve a single note by its ID from the database
    noteModel.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.json(note);
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
});

// Update a Note with noteId
router.put('/notes/:noteId', (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Update the note by its ID
    noteModel.findByIdAndUpdate(req.params.noteId, {
        content: req.body.content
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.json(note);
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
});

// Delete a Note with noteId
router.delete('/notes/:noteId', (req, res) => {
    // Delete a note by its ID
    noteModel.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.json({ message: "Note deleted successfully!" });
        })
        .catch(err => {
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
});

module.exports = router;