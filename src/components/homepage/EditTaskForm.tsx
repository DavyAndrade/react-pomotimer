import { useState, type ChangeEvent } from "react";
import type Task from "../../models/Task";
import { Button, Form, Input, TextArea } from "../ui";

type EditTaskFormProps = {
  task: Task;
  onClose: () => void;
  editTask: (taskId: string, updatedTask: Partial<Task>) => void;
};

export default function EditTaskForm({
  task,
  onClose,
  editTask,
}: EditTaskFormProps) {
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
    if (pomodorosCompleted.trim() === "") return;
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
    <Form
      className="w-full grid items-start gap-4 p-6 border-2 border-gray-600 hover:border-blue-400 rounded-md transition-colors"
      onSubmit={handleSubmit}
    >
      <Input
        label="Título"
        type="text"
        id="title"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        value={title}
        required
        className=""
      />

      <TextArea
        label="Descrição"
        id="description"
        rows={4}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
        value={description}
        className=""
      />

      <div className="grid gap-4 sm:grid-cols-2 w-full">
        <Input
          label="Pomodoros Completados"
          type="number"
          id="pomodorosCompleted"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPomodorosCompleted(e.target.value)
          }
          value={pomodorosCompleted}
          className="flex-1"
          min={0}
          required
        />

        <Input
          label="Meta Estimada"
          type="number"
          id="estimatedPomodoros"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEstimatedPomodoros(e.target.value)
          }
          value={estimatedPomodoros}
          min={1}
          required
        />
      </div>

      <div className="grid gap-4 w-full sm:grid-cols-2">
        <Button
          size="lg"
          type="submit"
          className="bg-green-600 rounded-md hover:bg-green-700"
        >
          Salvar
        </Button>
        <Button
          size="lg"
          type="button"
          onClick={onClose}
          className="bg-gray-500 rounded-md hover:bg-gray-600"
        >
          Cancelar
        </Button>
      </div>
    </Form>
  );
}
