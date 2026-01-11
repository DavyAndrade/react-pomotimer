import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { MoveLeft } from "lucide-react";
import { Button, Heading, Text } from "../components/ui";
import Timer from "../components/pomodoropage/Timer";

export default function Pomodoro() {
  const { taskId } = useParams<{ taskId: string }>();
  const { tasks } = useTasks();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <div className="flex min-h-full justify-center items-center gap-4">
        <Button
          onClick={() => navigate("/")}
          className="text-left flex items-center gap-2 text-gray-400 hover:text-white transition-colors hover:cursor-pointer w-fit"
          variant="primary"
          size="lg"
        >
          <MoveLeft size={18} />
          Voltar para Tarefas
        </Button>
        <Heading
          as="h1"
          className="flex min-h-full justify-center items-center flex-2"
        >
          Tarefa não encontrada
        </Heading>
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={() => navigate("/")}
        className="text-left flex items-center gap-2 text-gray-400 hover:text-white transition-colors hover:cursor-pointer w-fit"
        variant="transparent"
      >
        <MoveLeft size={18} />
        Voltar para Tarefas
      </Button>

      <section className="w-full grid grid-cols-1 justify-center items-center bg-gray-700/50 p-8 rounded-lg shadow-xl gap-4">
        <div className="w-full flex flex-col justify-center items-center gap-1">
          <Heading as="h1">{task.title}</Heading>
          {task.description && (
            <Text className="text-gray-400 text-center w-[75ch]">
              {task.description}
            </Text>
          )}
        </div>

        <Text variant="muted" className="text-gray-400 text-center">
          {task.pomodorosCompleted} / {task.estimatedPomodoros} pomodoros
          completados
        </Text>

        <Timer />
      </section>
    </>
  );
}
