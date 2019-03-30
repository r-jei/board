const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public')); //set up public directory to serve files from

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/board', {
    useNewUrlParser: true
});

const threadSchema = new mongoose.Schema({
    name: String,
    subject: String,
    desc: String,
});

const Thread = mongoose.model('Thread', threadSchema);

app.post('/api/threads', async (req, res) => {
    console.log('sup');
    console.log(req)
    const thread = new Thread({
	name: req.body.name,
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

// Get a list of all of the threads in the board.
app.get('/api/threads', async (req, res) => {
    console.log(req)
    try {
	let threads = await Thread.find();
	res.send(threads);
    } catch (error) {
	console.log(error);
	res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
