import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"; 
const API_ENDPOINT = `${API_BASE_URL}/tasks`;

const taskService = {
<<<<<<< HEAD
  getAllTasks: async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
=======
  getAllTasks: async (tagId = null) => {
    try {
      const params = tagId ? { tagId } : {};
      const response = await axios.get(API_ENDPOINT, { params });
>>>>>>> 2d968fb (commit finalized copy)
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  getTask: async (id) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw error;
    }
  },

  createTask: async (task) => {
    try {
<<<<<<< HEAD
      const response = await axios.post(API_ENDPOINT, task);
=======
      const taskData = {
        title: task.title,
        description: task.description,
        status: task.status,
        due_date: task.due_date,
        tags: task.tags // Array of tag IDs
      };
      const response = await axios.post(API_ENDPOINT, taskData);
>>>>>>> 2d968fb (commit finalized copy)
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  updateTask: async (id, task) => {
    try {
<<<<<<< HEAD
      const response = await axios.put(`${API_ENDPOINT}/${id}`, task);
=======
      const taskData = {
        title: task.title,
        description: task.description,
        status: task.status,
        due_date: task.due_date,
        tags: task.tags // Array of tag IDs
      };
      const response = await axios.put(`${API_ENDPOINT}/${id}`, taskData);
>>>>>>> 2d968fb (commit finalized copy)
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`${API_ENDPOINT}/${id}`);
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  },
};

export default taskService;