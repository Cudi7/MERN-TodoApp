const mongoose = require('mongoose');

const PublicTodosSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  todoId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  date: { type: Date, default: Date.now },
});

const PublicTodos = mongoose.model('Public-Todos', PublicTodosSchema);
module.exports = PublicTodos;
