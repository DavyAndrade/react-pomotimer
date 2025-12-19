import type Task from './Task'

export default function TaskCard({ task }: { task: Task }) {
  return (
    <article className="w-full flex flex-col gap-2 p-6 border-2 border-gray-600 rounded-md">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.pomodorosCompleted}/{task.estimatedPomodoros} pomodoros completados</p>
      <p>{task.completed ? 'Concluído' : 'Pendente'}</p>
    </article>
  )
}
