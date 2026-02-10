export default interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    pomodorosCompleted: number;
    estimatedPomodoros: number;
}