import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';

// Komponen TaskList untuk menampilkan daftar task berdasarkan status (To-Do, In Progress, Done)
const TaskList = ({ status, onEdit }) => {
  // Ambil semua task dari state global Redux
  const tasks = useSelector((state) => state.tasks.tasks);

  // Filter task berdasarkan status yang diterima dari props
  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">{status}</h2>
      {/* Jika tidak ada task, tampilkan pesan */}
      {filteredTasks.length === 0 ? (
        <p className="text-sm text-gray-600">No tasks in {status}</p>
      ) : (
        // Tampilkan setiap task menggunakan TaskCard
        filteredTasks.map(task => <TaskCard key={task.id} task={task} onEdit={onEdit} />)
      )}
    </div>
  );
};

export default TaskList;
