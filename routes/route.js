const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();

// Route to show all tasks
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.render('index', { todos });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route to create a new task
router.get('/new', (req, res) => {
    res.render('new');
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const newTodo = new Todo({
        title,
        description,
    });
    await newTodo.save();
    res.redirect('/todos');
});

// Route to edit a task
router.get('/edit/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.render('edit', { todo });
    console.log(todo);
});

// Use PUT method to update the task
router.put('/edit/:id', async (req, res) => {
    console.log("request hit");
    const { title, description } = req.body;
    console.log(req.body);
    try {
        // Find the task by ID and update it
        await Todo.findByIdAndUpdate(req.params.id, { title, description });
        // Redirect after the update
        res.redirect('/todos');
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('An error occurred while updating the task.');
    }
});


// Route to delete a task
router.get('/delete/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect('/todos');
});

// Route to mark a task as completed
router.get('/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.redirect('/todos');
});

module.exports = router;
