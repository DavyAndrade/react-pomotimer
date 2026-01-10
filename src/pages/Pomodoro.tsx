import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { MoveLeft } from "lucide-react";

export default function Pomodoro() {
  const { taskId } = useParams<{ taskId: string }>();
  const { tasks } = useTasks();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <main className="flex text-white">
        <p>Tarefa não encontrada</p>
      </main>
    );
  }

  return (
    <main className="w-full bg-gray-800 text-white flex flex-col py-16 px-4 items-center justify-center">
      <div className="flex flex-col w-full md:max-w-3xl gap-8">
        <button
          onClick={() => navigate("/")}
          className="text-left flex items-center gap-2 text-gray-400 hover:text-white transition-colors hover:cursor-pointer w-fit"
        >
          <MoveLeft size={18} />
          Voltar para Tarefas
        </button>
        <section className="w-full flex flex-col justify-center items-center bg-gray-700/50 p-8 rounded-lg shadow-xl gap-4">
          <div className="w-full flex flex-col justify-center items-center gap-1">
            <h1 className="text-xl font-bold">{task.title}</h1>
            {task.description && (
              <p className="text-gray-400 text-center w-[75ch]">
                {task.description}
              </p>
            )}
          </div>

          <p className="text-gray-400">
            {task.pomodorosCompleted} / {task.estimatedPomodoros} pomodoros
            completados
          </p>
        </section>
      </div>
    </main>
  );
}
