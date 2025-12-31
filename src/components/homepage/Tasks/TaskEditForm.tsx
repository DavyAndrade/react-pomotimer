import { useState } from "react";
import type Task from "../../../models/Task";

type TaskEditFormProps = {
  task: Task;
  onClose: () => void;
  editTask: (taskId: string, updatedTask: Partial<Task>) => void;
};

export default function TaskEditForm({
  task,
  onClose,
  editTask,
}: TaskEditFormProps) {
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(
    task.description || ""
  );
  const [pomodorosCompleted, setPomodorosCompleted] = useState<string>(
    String(task.pomodorosCompleted)
  );
  const [estimatedPomodoros, setEstimatedPomodoros] = useState<string>(
    String(task.estimatedPomodoros)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEditTask(title, description, pomodorosCompleted, estimatedPomodoros);
  };

  const handleEditTask = (
    title: string,
    description: string,
    pomodorosCompleted: string,
    estimatedPomodoros: string
  ) => {
    if (title.trim() === "") return;
    if (estimatedPomodoros.trim() === "") return;

    const updatedTask: Task = {
      id: task.id,
      title: title,
      description: description,
      pomodorosCompleted: Number(pomodorosCompleted),
      estimatedPomodoros: Number(estimatedPomodoros),
      completed: task.completed,
    };

    editTask(task.id, updatedTask);
    setTitle("");
    setDescription("");
    setPomodorosCompleted("");
    setEstimatedPomodoros("");
    onClose();
  };

  return (
    <form
      className="w-full flex flex-col items-start gap-4 p-6 border-2 border-gray-600 hover:border-blue-400 rounded-md transition-colors"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border-2 border-gray-600 rounded-md p-2"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border-2 border-gray-600 rounded-md p-2"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row w-full">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="pomodorosCompleted">Pomodoros Completados</label>
          <input
            type="number"
            id="pomodorosCompleted"
            onChange={(e) => setPomodorosCompleted(e.target.value)}
            value={pomodorosCompleted}
            className="border-2 border-gray-600 rounded-md p-2 flex-1"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="estimatedPomodoros">Meta Estimada</label>
          <input
            type="number"
            id="estimatedPomodoros"
            onChange={(e) => setEstimatedPomodoros(e.target.value)}
            value={estimatedPomodoros}
            className="border-2 border-gray-600 rounded-md p-2 flex-1"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 w-full sm:flex-row">
        <button
          type="submit"
          className="bg-green-600 p-4 rounded-md flex-1 w-full hover:cursor-pointer hover:bg-green-700 transition-colors"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 p-4 rounded-md flex-1 w-full hover:cursor-pointer hover:bg-gray-600 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
