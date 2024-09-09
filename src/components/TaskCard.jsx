import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/tasksSlice";

// Komponen TaskCard untuk menampilkan setiap task
const TaskCard = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  // Fungsi untuk menghapus task
  const handleDelete = () => {
    dispatch(deleteTask(task.id)); // Dispatch action untuk menghapus task berdasarkan id
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-sm text-gray-700">{task.description}</p>
      <p className="text-xs text-gray-500 mt-2">Priority: {task.priority}</p>
      <div className="mt-2 space-x-4">
        {/* Tombol untuk menghapus task */}
        <button onClick={handleDelete} className=" text-red-500 text-sm">
          Delete
        </button>
        {/* Tombol untuk mengedit task */}
        <button onClick={() => onEdit(task)} className=" text-blue-500 text-sm">
          Edit
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
