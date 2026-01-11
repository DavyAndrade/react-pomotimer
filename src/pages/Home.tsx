import { EllipsisVertical } from "lucide-react";
import TaskCard from "../components/homepage/TaskCard";
import { useTasks } from "../hooks/useTasks";
import { useEffect } from "react";
import { Button, Heading, Text } from "../components/ui";
import AddTaskForm from "../components/homepage/AddTaskForm";

export default function Home() {
  const { tasks, addTask, editTask, toggleComplete, removeTask } = useTasks();

  useEffect(() => {
    document.title = "Pomotimer - Tarefas";
  }, []);

  return (
    <section className="w-full flex flex-col justify-between items-center gap-8">
      {/* Cabeçalho */}
      <div className="flex justify-between w-full border-b-2 border-gray-600 pb-4">
        <Heading as="h4" className="">
          Tarefas
        </Heading>
        <Button
          size="icon"
          variant="transparent"
          className="flex justify-center items-center p-1 bg-gray-700 rounded-md hover:bg-gray-600 hover:cursor-pointer transition-colors"
        >
          <EllipsisVertical size={20} />
        </Button>
      </div>
      {/* Container de Tarefas */}
      <div className="w-full flex flex-col justify-center items-center gap-8">
        {/* Botão de Adicionar Tarefa */}

        <AddTaskForm onAddTask={addTask} />

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
          <div className="grid gap-1">
            <Text variant="muted" className="text-center text-lg">
              Nenhuma tarefa adicionada ainda.
            </Text>
            <Text variant="muted" className="text-center text-lg">
              Comece adicionando sua primeira tarefa acima!
            </Text>
          </div>
        )}
      </div>
    </section>
  );
}
