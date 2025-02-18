import React, { useState, useEffect } from 'react';
import './TaskForm.scss';

function TaskForm({ task, addTask, onCancel }) {
  // Initialize state with existing task data or defaults
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'open'
  });

  // If editing existing task, populate form with task data
  useEffect(() => {
    if (task) {
      // Format the date to YYYY-MM-DD for the date input
      const formattedDate = task.due_date ? 
        new Date(task.due_date).toISOString().split('T')[0] : '';
      
      setFormData({
        title: task.title || '',
        description: task.description || '',
        due_date: formattedDate,
        status: task.status || 'open'
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }

    // Create task object
    const taskData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim()
    };

    // Submit the task
    addTask(task ? { ...taskData, id: task.id } : taskData);
    
    // Reset form if not editing
    if (!task) {
      setFormData({
        title: '',
        description: '',
        due_date: '',
        status: 'open'
      });
    }

    // Call onCancel if provided (for closing edit mode)
    if (onCancel) {
      onCancel();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="due_date">Due Date</label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {task ? 'Update Task' : 'Add Task'}
        </button>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;