import { useLocalStorage } from "./useLocalStorage";
import type Task from "../models/Task";

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("pomodoroTasks", []);

  /* Adicionar tarefa */
  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    console.log("Task added:", tasks);
  }

  /* Editar tarefa */
  const editTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, title: "Teste" } : task
      )
    );
    console.log("Task edited:", tasks);
  }

  /* Marcar tarefa como completa */
  const toggleCompleteTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    console.log("Task toggled:", tasks);
  }

    /* Remover tarefa */
    const removeTask = (taskId: string) => {
      setTasks(tasks.filter((task) => task.id !== taskId));
      console.log("Task removed:", tasks);
    };

  return {
    tasks,
    addTask,
    editTask,
    toggleCompleteTask,
    removeTask,
  };
}
