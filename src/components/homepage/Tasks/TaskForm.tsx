import { useState } from "react";
import type Task from "../../../models/Task";

type TaskFormProps = {
  onAddTask: (task: Task) => void;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [isShowForm, setIsShowForm] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [estimatedPomodoros, setEstimatedPomodoros] = useState<string>("4");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsShowForm(false);
    handleAddTask();
  }

  function handleAddTask() {
    if (title.trim() === "") return;
    if (estimatedPomodoros.trim() === "") return;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      estimatedPomodoros: Number(estimatedPomodoros),
      pomodorosCompleted: 0,
    };

    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setEstimatedPomodoros("4");
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {isShowForm ? (
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 p-6 border-2 border-blue-500 rounded-md"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              placeholder="Ex.: Lição de Matemática"
              className="border-2 border-gray-600 rounded-md p-2"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description">Descrição</label>
            <textarea
              name="description"
              id="description"
              rows={5}
              placeholder="Ex.: Funções de Terceiro Grau"
              className="border-2 border-gray-600 rounded-md p-2"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="estimatedPomodoros">Pomodoros</label>
            <input
              type="number"
              id="estimatedPomodoros"
              value={estimatedPomodoros}
              className="border-2 border-gray-600 rounded-md p-2"
              onChange={(e) => setEstimatedPomodoros(e.target.value)}
              min={1}
            />
          </div>

          <div className="flex w-full gap-2">
            <button
              type="submit"
              className="flex justify-center items-center px-6 py-2 bg-blue-500 text-white w-full rounded-md hover:bg-blue-600 hover:cursor-pointer transition-colors"
            >
              Adicionar
            </button>
            <button
              onClick={() => setIsShowForm(false)}
              className="flex justify-center items-center px-6 py-2 bg-gray-500 text-white w-full rounded-md hover:bg-gray-600 hover:cursor-pointer transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <button
          className="flex justify-center items-center px-6 py-8 bg-gray-800/75 text-gray-500 w-full rounded-md border-2 border-dashed border-gray-700 hover:bg-gray-700 hover:border-blue-500 hover:text-white hover:cursor-pointer focus:bg-gray-700 focus:text-white transition-colors"
          onClick={() => setIsShowForm(true)}
        >
          + Adicionar tarefa
        </button>
      )}
    </div>
  );
}
