import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";

export default function Pomodoro() {
  const { taskId } = useParams<{ taskId: string }>();
  const { tasks } = useTasks();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return <main className="flex text-white">Task not found</main>;
  }

  return (
    <main className="w-full bg-gray-800 text-white flex flex-col py-16 items-center px-4">
      <div className="flex flex-col justify-center items-center w-full gap-4 md:max-w-3xl">
        <button onClick={() => navigate("/")}>Back</button>
        <h1 className="text-3xl font-bold mb-4">Pomodoro for: {task.title}</h1>
      </div>
    </main>
  );
}
