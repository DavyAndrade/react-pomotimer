import { useLocalStorage } from "./useLocalStorage";
import type Task from "../models/Task";

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("pomodoroTasks", []);

  /* Adicionar tarefa */
  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  /* Editar tarefa */
  const editTask = (taskId: string, updatedTask: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  /* Marcar tarefa como completa/incompleta */
  const toggleCompleteTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /* Remover tarefa */
  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return {
    tasks,
    addTask,
    editTask,
    toggleCompleteTask,
    removeTask,
  };
}
