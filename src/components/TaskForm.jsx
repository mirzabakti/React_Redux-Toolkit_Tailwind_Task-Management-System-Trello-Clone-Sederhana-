import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../features/tasks/tasksSlice';

const TaskForm = ({ taskToEdit, clearEdit }) => {
  const [title, setTitle] = useState(''); // State untuk title
  const [description, setDescription] = useState(''); // State untuk description
  const [priority, setPriority] = useState('Low'); // State untuk priority
  const [status, setStatus] = useState('To-Do'); // State untuk status

  const dispatch = useDispatch(); // Gunakan dispatch untuk mengirim action

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
    } 
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Jika ada taskToEdit, maka edit task, jika tidak, tambahkan task baru
    if (taskToEdit) {
      dispatch(editTask({ id: taskToEdit.id, title, description, priority, status }));
      clearEdit(); // Bersihkan mode edit setelah task disimpan
    } else {
      dispatch(addTask({ id: Date.now(), title, description, priority, status }));
    }
    
    setTitle(''); // Reset form setelah submit
    setDescription('');
    setPriority('Low');
    setStatus('To-Do');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Input untuk title task */}
      <div className="mb-4">
        <label className="block text-sm font-bold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-2 py-1 border rounded"
          placeholder="Task title"
          required
        />
      </div>
      {/* Input untuk deskripsi task */}
      <div className="mb-4">
        <label className="block text-sm font-bold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-2 py-1 border rounded"
          placeholder="Task description"
        />
      </div>
      {/* Dropdown untuk priority task */}
      <div className="mb-4">
        <label className="block text-sm font-bold">Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full px-2 py-1 border rounded">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      {/* Dropdown untuk status task */}
      <div className="mb-4">
        <label className="block text-sm font-bold">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-2 py-1 border rounded">
          <option>To-Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>
      {/* Button untuk submit form */}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
