import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import type Task from "./Task";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>(() => {
      const savedTasks = localStorage.getItem("pomodoroTasks");
  
      if (!savedTasks) return [];
  
      try {
        return JSON.parse(savedTasks);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
        return [];
      }
    });

    useEffect(() => {
      localStorage.setItem("pomodoroTasks", JSON.stringify(tasks));
    }, [tasks]);

  /* 
    TODO: 
    - Listar tarefas
    - Remover tarefa
    - Editar tarefa
    - Marcar tarefa
  */
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

        <TaskForm />

        {/* Lista de Tarefas */}

        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task}/>
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
