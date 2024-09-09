import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";

// Komponen TaskList untuk menampilkan daftar task berdasarkan status (To-Do, In Progress, Done)
const TaskList = ({ status, onEdit }) => {
  // Ambil semua task dari state global Redux
  const tasks = useSelector((state) => state.tasks.tasks);

  // Filter task berdasarkan status yang diterima dari props
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div className="p-4 bg-white rounded-lg shadow-md" {...provided.droppableProps} ref={provided.innerRef}>
          <h2 className="text-lg font-bold mb-4">{status}</h2>
          {/* Jika tidak ada task, tampilkan pesan */}
          {filteredTasks.length === 0 ? (
            <p className="text-sm text-gray-600">No tasks in {status}</p>
          ) : (
            // Tampilkan setiap task menggunakan TaskCard
            filteredTasks.map((task, index) => <TaskCard key={task.id} task={task} onEdit={onEdit} index={index} />)
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
