const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    done: { type: Boolean, default: false }
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const TodoModel = mongoose.model('Todo', TodoSchema);
const UserModel = mongoose.model('User', UserSchema);

module.exports = { TodoModel, UserModel };
