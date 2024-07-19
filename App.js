import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [editMode, setEditMode] = useState(null); // State to manage which task is being edited

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescriptionValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      if (editMode !== null) {
        // If edit mode is active, update the task instead of adding new
        const updatedTasks = tasks.map(task => {
          if (task.id === editMode) {
            return { ...task, text: inputValue, description: descriptionValue };
          }
          return task;
        });
        setTasks(updatedTasks);
        setEditMode(null); // Exit edit mode
      } else {
        // Otherwise, add new task
        setTasks([...tasks, { id: tasks.length + 1, text: inputValue, description: descriptionValue }]);
      }
      setInputValue('');
      setDescriptionValue('');
    }
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setInputValue(taskToEdit.text);
    setDescriptionValue(taskToEdit.description);
    setEditMode(id);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    if (editMode === id) {
      setEditMode(null); // Exit edit mode if deleting currently edited task
    }
  };

  return (
    <div className="App">
      <h1>TODO List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter task..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="Enter description..."
          value={descriptionValue}
          onChange={handleDescriptionChange}
        />
        <button onClick={handleAddTask}>{editMode !== null ? 'Update Task' : 'Add Task'}</button>
      </div>
      <div className="task-list">
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={task.id}>
              <div className="task-details">
                <div className="task-header">
                  <span className="task-title">{index + 1}. {task.text}</span>
                  <div className="task-actions">
                    <button className="edit-button" onClick={() => handleEditTask(task.id)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  </div>
                </div>
                <div className="task-description">
                  <span className="description-label">Description:</span>
                  <span className="description-text">{task.description}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
