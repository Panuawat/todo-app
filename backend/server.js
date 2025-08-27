// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './database.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/api/todos', async (req, res) => {
    try {
        const todos = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
        res.json(todos.rows);
    } catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

app.get('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
        
        if (todo.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        res.json(todo.rows[0]);
    } catch (err) {
        console.error('Error fetching todo:', err);
        res.status(500).json({ error: 'Failed to fetch todo' });
    }
});

app.post('/api/todos', async (req, res) => {
    try {
        const { title, completed } = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todos (title,completed) VALUES ($1,$2) RETURNING *',
            [title, completed ]
        );
        
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        
        res.status(201).json(newTodo.rows[0], { message: 'Todo created successfully' });
    } catch (err) {
        console.error('Error creating todo:', err);
        res.status(500).json({ error: 'Failed to create todo' });
    }   
});

app.put('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const updatedTodo = await pool.query(
            'UPDATE todos SET title = $1, completed = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
            [title, completed, id]
        );
        
        if (updatedTodo.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        res.json(updatedTodo.rows[0], { message: 'Todo updated successfully' });
    } catch (err) {
        console.error('Error updating todo:', err);
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

app.delete('/api/todos', async (req, res) => {
    try {
        const deletedTodos = await pool.query('DELETE FROM todos RETURNING *');
        
        if (deletedTodos.rows.length === 0) {
            return res.status(404).json({ error: 'No todos to delete' });
        }
        
        res.json({ message: 'All todos deleted successfully' });
    } catch (err) {
        console.error('Error deleting todos:', err);
        res.status(500).json({ error: 'Failed to delete todos' });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
        
        if (deletedTodo.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error('Error deleting todo:', err);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
})

app.listen(PORT, () => {
  console.log(`Todo API Server is running on port ${PORT}`);
});