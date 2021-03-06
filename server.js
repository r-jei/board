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
    comment: String,
});

const Thread = mongoose.model('Thread', threadSchema);

app.post('/api/threads', async (req, res) => {
    console.log('sup');
    console.log(req)
    const thread = new Thread({
	name: req.body.name,
	subject: req.body.subject,
	comment: req.body.comment
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

app.delete('/api/threads/:id', async (req,res) => {
    try {
	let success = await Thread.deleteOne( {"_id": req.params.id} );
	res.sendStatus(200);
    } catch (error) {
	console.log(error);
	res.sendStatus(500);
    }
});

// Create a new item in the museum: takes a title and a path to an image.
app.put('/api/threads/:id', async (req, res) => {
    try {
	let thread = await Thread.findOne({"_id": req.params.id});
	thread.name = req.body.name
	thread.subject = req.body.subject
	thread.comment = req.body.comment
	await thread.save();
	res.send(thread);
	
    } catch (error) {
	console.log(error);
	res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
