import { EllipsisVertical } from "lucide-react";
import TaskCard from "../components/homepage/TaskCard";
import { useTasks } from "../hooks/useTasks";
import TaskForm from "../components/homepage/TaskForm";

export default function Home() {
  const { tasks, addTask, editTask, toggleComplete, removeTask } = useTasks();

  return (
    <section className="w-full flex flex-col justify-between items-center gap-8">
      {/* Cabeçalho */}
      <div className="flex justify-between w-full border-b-2 border-gray-600 pb-4">
        <h2 className="text-xl font-bold">Tarefas</h2>
        <button className="flex justify-center items-center p-1 bg-gray-700 rounded-md hover:bg-gray-600 hover:cursor-pointer transition-colors">
          <EllipsisVertical size={20} />
        </button>
      </div>

      {/* Container de Tarefas */}
      <div className="w-full flex flex-col justify-center items-center gap-8">
        {/* Botão de Adicionar Tarefa */}

        <TaskForm onAddTask={addTask} />

        {/* Lista de Tarefas */}

        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              removeTask={removeTask}
              toggleComplete={toggleComplete}
              editTask={editTask}
            />
          ))
        ) : (
          <div>
            <p className="text-gray-500 text-center text-lg">
              Nenhuma tarefa adicionada ainda.
            </p>
            <p className="text-gray-500 text-center text-lg">
              Comece adicionando sua primeira tarefa acima!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
