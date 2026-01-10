import { Check, Pencil, Target, Trash2 } from "lucide-react";
import type Task from "../../models/Task";
import { useState } from "react";
import { Link } from "react-router-dom";
import TaskEditForm from "./TaskEditForm";

type TaskCardProps = {
  task: Task;
  removeTask: (taskId: string) => void;
  toggleComplete: (taskId: string) => void;
  editTask: (taskId: string, updatedTask: Partial<Task>) => void;
};

export default function TaskCard({
  task,
  removeTask,
  toggleComplete,
  editTask,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const progress = Math.min(
    Math.round((task.pomodorosCompleted / task.estimatedPomodoros) * 100),
    100
  );

  if (isEditing) {
    return (
      <TaskEditForm
        task={task}
        onClose={() => setIsEditing(false)}
        editTask={editTask}
      />
    );
  }

  return (
    <article
      className={`w-full flex flex-col items-start gap-2 p-6 border-2 cursor-auto ${
        task.completed
          ? "border-green-500 opacity-75"
          : "border-gray-600 hover:border-blue-400"
      } rounded-md transition-colors`}
    >
      <div className="flex items-start gap-3 w-full">
        {/* Botão de Switch de Concluído */}
        <button
          className={`flex items-center justify-center h-5 w-5 rounded-sm border-2 border-gray-600 hover:cursor-pointer mt-1 ${
            task.completed
              ? "bg-green-500 border-green-500"
              : "hover:border-green-500"
          }`}
          onClick={() => {
            toggleComplete(task.id);
          }}
        >
          {task.completed && <Check size={20} />}
        </button>

        <Link to={`pomodoro/${task.id}`} className="flex flex-col gap-4 flex-1">
          {/* Título e Descrição */}
          <div className="flex flex-col gap-1">
            <h3
              className={`font-bold text-lg ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.title}
            </h3>

            {task.description && (
              <p className="text-gray-400 text-sm">{task.description}</p>
            )}
          </div>

          <div className="flex flex-col items-start gap-2">
            {/* Barra de Progresso */}
            <p className="flex items-center gap-1 text-sm text-gray-400">
              <Target className="text-blue-400" size={20} />{" "}
              {task.pomodorosCompleted} / {task.estimatedPomodoros} pomodoros
            </p>

            <div className="w-full flex flex-col items-start gap-1">
              <div className="w-full h-2 bg-gray-700 rounded-md overflow-hidden">
                <div
                  className="h-full bg-blue-400"
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>
              </div>
              <p className="text-gray-400 text-xs">{progress}% concluído</p>
            </div>
          </div>
        </Link>

        <div className="flex gap-1">
          {/* Botão de Editar */}
          <button
            className="text-blue-400 hover:bg-gray-700 p-2 rounded-sm hover:cursor-pointer"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <Pencil size={20} />
          </button>

          {/* Botão de Remover */}
          <button
            className="text-red-400 hover:bg-gray-700 p-2 rounded-sm hover:cursor-pointer"
            onClick={() => {
              removeTask(task.id);
            }}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}
