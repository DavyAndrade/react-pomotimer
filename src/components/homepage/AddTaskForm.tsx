import { useState, type ChangeEvent } from "react";
import type Task from "../../models/Task";
import { Button, Form, Input, TextArea } from "../ui";

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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            required
          />

          <TextArea
            label="Descrição"
            id="description"
            rows={4}
            placeholder="Ex.: Funções de Terceiro Grau"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          />

          <Input
            label="Pomodoros"
            type="number"
            id="estimatedPomodoros"
            value={estimatedPomodoros}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEstimatedPomodoros(e.target.value)
            }
            min={1}
            required
          />

          <div className="grid w-full gap-4 sm:grid-cols-2">
            <Button
              size="lg"
              variant="primary"
              type="submit"
              className="flex justify-center items-center text-white rounded-md"
            >
              Adicionar
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setIsShowForm(false)}
              className="flex justify-center items-center text-white rounded-md"
            >
              Cancelar
            </Button>
          </div>
        </Form>
      ) : (
        <Button
          fullWidth
          className="px-6 py-8 bg-gray-800/75 text-gray-400 rounded-md border-2 border-dashed border-gray-700 hover:bg-gray-700 hover:border-blue-500 hover:text-white focus:bg-gray-700 focus:text-white"
          variant="personalized"
          onClick={() => setIsShowForm(true)}
        >
          + Adicionar tarefa
        </Button>
      )}
    </div>
  );
}
