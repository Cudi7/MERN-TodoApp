const app = require('express');
const PublicTodos = require('../models/PublicTodosModel');

const route = app.Router();

//get all public todos
route.get('/', async (req, res) => {
  try {
    const publicTodos = await PublicTodos.find({});

    if (!publicTodos.length)
      return res.status('500').json({
        error:
          'Currently empty... add something and make it public to share it to the World! 🤯',
      });
    else res.status('200').json(publicTodos);
  } catch (error) {
    res.status('500').json(error.message);
  }
});

//delete single todo
route.delete('/delete/:todoId', async (req, res) => {
  const todoId = req.params.todoId;
  try {
    const todoToDelete = await PublicTodos.find({ todoId: todoId });

    if (todoToDelete.length <= 0)
      return res.status('404').json({ error: "Ups, this todo doesn't exist" });

    if (todoToDelete[0].userId !== req.body.userId)
      return res.status('404').json({ error: "This todo isn't yours!!" });

    await PublicTodos.deleteOne({ todoId: todoId });
    res.status('200').json({
      // id: newPublicTodo.id,
      success: 'Public todo Removed',
    });
  } catch (error) {
    res.status('500').json({ error: error.message });
  }
});

//post single todo
route.post('/new', async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const userId = req.body.userId;
  const todoId = req.body.todoId;

  try {
    const newPublicTodo = await PublicTodos.create({
      name,
      description,
      userId,
      todoId,
    });

    res.status('200').json({
      id: newPublicTodo.id,
      name: newPublicTodo.name,
      description: newPublicTodo.description,
    });
  } catch (error) {
    res.status('500').json({ error: error.message });
  }
});

module.exports = route;
