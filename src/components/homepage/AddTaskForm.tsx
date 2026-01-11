import { useState } from "react";
import type Task from "../../models/Task";
import Form from "../ui/Form";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";

type AddTaskFormProps = {
  onAddTask: (task: Task) => void;
};

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
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
        <Form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 p-6 border-2 border-blue-500 rounded-md"
        >
          <Input
            id="title"
            label="Título"
            placeholder="Ex.: Lição de Matemática"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextArea
            label="Descrição"
            name="description"
            id="description"
            rows={4}
            placeholder="Ex.: Funções de Terceiro Grau"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            label="Pomodoros"
            type="number"
            id="estimatedPomodoros"
            value={estimatedPomodoros}
            onChange={(e) => setEstimatedPomodoros(e.target.value)}
            min={1}
            required
          />

          <div className="flex w-full gap-2">
            <Button
              size="lg"
              variant="primary"
              type="submit"
              className="flex justify-center items-center text-white w-full rounded-md"
            >
              Adicionar
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setIsShowForm(false)}
              className="flex justify-center items-center text-white w-full rounded-md"
            >
              Cancelar
            </Button>
          </div>
        </Form>
      ) : (
        <Button
          fullWidth
          className="flex justify-center items-center px-6 py-8 bg-gray-800/75 text-gray-500 w-full rounded-md border-2 border-dashed border-gray-700 hover:bg-gray-700 hover:border-blue-500 hover:text-white focus:bg-gray-700 focus:text-white"
          onClick={() => setIsShowForm(true)}
        >
          + Adicionar tarefa
        </Button>
      )}
    </div>
  );
}
