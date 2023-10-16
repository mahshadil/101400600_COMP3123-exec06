const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes');


// app.use('/api', notesRouter);


const DB_URL = "mongodb+srv://lab6:lab6@cluster0.6immbjm.mongodb.net/lab6?retryWrites=true&w=majority"
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.error("Could not connect to the database. Exiting now...", err);
      process.exit();
    });


app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

app.use('/api', noteRoutes);

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});