import { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
// import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const AddTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks', 
        { taskName, description, dueDate }, 
        { withCredentials: true }
      );
      navigate('/');
    } catch (err) {
      console.error('Error creating task:', err.response ? err.response.data : err.message);
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4 px-5 text-muted">Add Task</h2>
      <div className='p-5 m-3'>
      <div className=' justify-content-center w-50'>
      <form onSubmit={handleSubmit}>
        <div className='d-flex justify-content-between align-items-center mb-2'>
        <label>Task Name:</label>
        <input
          className="w-full p-2 mb-3 border rounded"
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        </div>
        <div className='d-flex justify-content-between align-items-center mb-2'>
          <label>Description:</label>
        <textarea
          className="w-full p-2 mb-3 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <div className='d-flex justify-content-between align-items-center mb2'>
        <label>Date:</label>
        <input
          className="w-full p-2 mb-3 border rounded"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        </div>
        <div className='d-flex justify-content-end mt-2'>
        <button className="btn btn-success">
          Create Task
        </button>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
};

export default AddTask;
