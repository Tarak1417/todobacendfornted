const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { TodoModel, UserModel } = require('./Models/Todo'); // Import models

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Could not connect to MongoDB:', error.message));

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(error => res.json({ error: error.message })); 
});

app.post('/add', (req, res) => {
    const { task } = req.body;
    console.log('Received task:', task);
    TodoModel.create({ task: task })
        .then(result => res.json(result))
        .catch(error => {
            console.error('Error creating task:', error.message);
            res.json({ error: error.message });
        });
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { done } = req.body;
    TodoModel.findByIdAndUpdate(id, { done: done }, { new: true })
        .then(result => res.json(result))
        .catch(error => res.json({ error: error.message }));
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(error => res.json({ error: error.message }));
});

// User routes

app.post('/adduser', (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received user:', name);
    UserModel.create({ name, email, password })
        .then(result => res.json(result))
        .catch(error => {
            console.error('Error creating user:', error.message);
            res.json({ error: error.message });
        });
});

app.get('/getuser', (req, res) => {
    UserModel.find()
        .then(result => res.json(result))
        .catch(error => res.json({ error: error.message })); 
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
