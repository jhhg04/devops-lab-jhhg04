import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(() => alert('Error loading tasks'));
  }, []);

  const addTask = () => {
    if (!newTask.trim()) {
      alert('Task cannot be empty');
      return;
    }

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask }),
    })
      .then((res) => res.json())
      .then((task) => {
        setTasks([...tasks, task]);
        setNewTask('');
      });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' }).then(() =>
      setTasks(tasks.filter((t) => t._id !== id)),
    );
  };

  const updateTask = (id) => {
    const newTitle = prompt('Edit task:');
    if (!newTitle || !newTitle.trim()) return;

    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setTasks(tasks.map((t) => (t._id === id ? updated : t)));
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 DevOps Task App</h1>

        <div style={styles.inputContainer}>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder='Enter a task...'
            style={styles.input}
          />
          <button
            onClick={addTask}
            style={styles.addButton}
          >
            Add
          </button>
        </div>

        <ul style={styles.list}>
          {tasks.map((task) => (
            <li
              key={task._id}
              style={styles.taskItem}
            >
              <span>{task.title}</span>

              <div>
                <button
                  onClick={() => updateTask(task._id)}
                  style={styles.editButton}
                >
                  ✏️
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  style={styles.deleteButton}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
    fontFamily: 'Arial',
    backgroundColor: '#f4f6f8',
    height: '100vh',
  },
  card: {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    width: '400px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
  editButton: {
    marginRight: '5px',
    background: '#ffc107',
    border: 'none',
    padding: '5px 8px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  deleteButton: {
    background: '#f44336',
    color: 'white',
    border: 'none',
    padding: '5px 8px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default App;
