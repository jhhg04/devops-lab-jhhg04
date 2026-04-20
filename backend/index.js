require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Task = require('./models/Task');

const app = express();
app.use(cors());
app.use(express.json());

// Port configuration
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

// Handle connection errors
db.on('error', console.error.bind(console, 'Mongo connection error:'));

// Start server only after DB is connected
db.once('open', () => {
  console.log('MongoDB connected');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

/**
 * GET /tasks
 * Retrieve all tasks
 */
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

/**
 * POST /tasks
 * Create a new task
 */
app.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
    });

    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

/**
 * PUT /tasks/:id
 * Update a task by ID
 */
app.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }, // return updated document
    );

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Error updating task' });
  }
});

/**
 * DELETE /tasks/:id
 * Delete a task by ID
 */
app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

/**
 * GET /
 * Health check endpoint
 */
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});
