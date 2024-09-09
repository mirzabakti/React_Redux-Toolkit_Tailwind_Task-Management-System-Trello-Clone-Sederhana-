import { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '../features/tasks/tasksSlice';

// Komponen Dashboard untuk menampilkan halaman utama aplikasi
const Dashboard = () => {
  const [taskToEdit, setTaskToEdit] = useState(null); // State untuk task yang sedang di-edit
  const tasks = useSelector((state) => state.tasks.tasks); // Ambil tasks dari Redux store
  const dispatch = useDispatch();

  const handleEdit = (task) => {
    setTaskToEdit(task); // Set task yang akan di-edit
  };

  const clearEdit = () => {
    setTaskToEdit(null); // Bersihkan task setelah edit selesai
  };

    // Fungsi untuk menangani perpindahan task antar kategori
    const handleDragEnd = (result) => {
      const { destination, source, draggableId } = result;
  
      // Jika task tidak dijatuhkan di area yang valid, tidak melakukan apa-apa
      if (!destination) return;
  
      // Jika task dijatuhkan di tempat yang sama, tidak perlu mengupdate state
      if (destination.droppableId === source.droppableId && destination.index === source.index) return;
  
      // Update status task sesuai kategori baru
      const task = tasks.find((task) => task.id === parseInt(draggableId)); // Cari task berdasarkan draggableId (yang sebenarnya adalah task.id)
      if (task) {
        dispatch(editTask({
          ...task,
          status: destination.droppableId, // Update status task berdasarkan droppableId tujuan
        }));
      }
    };
  
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Task Management Dashboard</h1>
      {/* TaskForm untuk menambah task */}
      <TaskForm taskToEdit={taskToEdit} clearEdit={clearEdit} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {/* Tampilkan task list berdasarkan kategori */}
          <TaskList status="To-Do" onEdit={handleEdit} />
          <TaskList status="In Progress" onEdit={handleEdit} />
          <TaskList status="Done" onEdit={handleEdit} />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
