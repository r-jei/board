const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

// connect to the database. will create a brand new database for us, museum, if it doesn't already exist.
mongoose.connect('mongodb://localhost:27017/museum', {
    useNewUrlParser: true
});

const threadSchema = new mongoose.Schema({
    name: String,
    subject: String,
    desc: String,
});

const Thread = mongoose.model('Thread', threadSchema);

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/threads', async (req, res) => {
    console.log(req)
    const thread = new Thread({
	name: req.body.title,
	subject: req.body.subject,
	comment: req.body.comment,
    });
    try {
	await thread.save();
	res.send(thread);
    } catch (error) {
	console.log(error);
	res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
