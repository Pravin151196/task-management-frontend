import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../services/api';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    taskName: '',
    description: '',
    dueDate: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tasks/${id}`).then((res) => {
      const t = res.data;
      setTask({
        taskName: t.taskName,
        description: t.description,
        dueDate: t.dueDate.split('T')[0],
      });
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
      <form onSubmit={handleUpdate}>
        <input
          className="w-full p-2 mb-3 border rounded"
          type="text"
          value={task.taskName}
          onChange={(e) => setTask({ ...task, taskName: e.target.value })}
          required
        />
        <textarea
          className="w-full p-2 mb-3 border rounded"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <input
          className="w-full p-2 mb-3 border rounded"
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
