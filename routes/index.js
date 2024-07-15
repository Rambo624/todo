var express = require('express');
var router = express.Router();

/* GET home page. */

let todos=[{title:"Learn Javascript"}]
let idCounter=1

router.get('/', function(req, res, next) {
  res.redirect("/todos")
});

router.get('/todos', (req, res) => {
  res.json(todos);
});

router.post('/todos', (req, res) => {
  const todo = {
      id: idCounter++, // Use idCounter and increment it
      title: req.body.title,
      completed: req.body.completed || false
  };
  todos.push(todo);
  res.status(201).json(todo);
});

router.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found.');
  res.json(todo);
});

router.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found.');

  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

  res.json(todo);
});


router.delete('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) return res.status(404).send('Todo not found.');

  const deletedTodo = todos.splice(todoIndex, 1);
  res.json(deletedTodo);
});



module.exports = router;
