import { useEffect, useState } from 'react';
import axios from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to load tasks', err);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 fw-bold">Task Management</h2>
        <Link to="/add" className="btn btn-primary">
          + Add Task
        </Link>
      </div>

      <ul className="list-unstyled">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-white p-3 mb-3 shadow rounded d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
          >
            <div className="col-12 col-md-9">
              <div className="mb-2">
                <strong>Task:</strong> <span>{task.taskName}</span>
              </div>
              <div className="mb-2">
                <strong>Description:</strong> <span>{task.description}</span>
              </div>
              <div className="mb-2">
                <strong>Due Date:</strong>{' '}
                <small className="text-muted">{new Date(task.dueDate).toLocaleDateString()}</small>
              </div>
            </div>

            <div className="col-12 col-md-3 d-flex justify-content-md-end mt-3 mt-md-0">
              <Link
                to={`/edit/${task._id}`}
                className="text-primary me-3 text-decoration-none"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteTask(task._id)}
                className="btn btn-link text-danger p-0"
              >
                Delete
              </button>
            </div>
          </li>

        ))}
      </ul>
    </div>
  );
};

export default Tasks;
