import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { Button, Heading, ProgressBar, Text } from "../ui";
import { useEffect, useRef, useState } from "react";
import type Task from "../../models/Task";

type TimerProps = {
  task: Task;
  editTask: (taskId: string, updatedTask: Partial<Task>) => void;
};

export default function Timer({ task, editTask }: TimerProps) {
  const FOCUS_DURATION = 25 * 60;
  const SHORT_BREAK_DURATION = 5 * 60;
  const LONG_BREAK_DURATION = 15 * 60;

  const [mode, setMode] = useState<"focus" | "shortBreak" | "longBreak">(
    "focus"
  );
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionPomodoros, setSessionPomodoros] = useState(0);

  const taskRef = useRef(task);
  const editTaskRef = useRef(editTask);

  useEffect(() => {
    taskRef.current = task;
    editTaskRef.current = editTask;
  }, [task, editTask]);

  useEffect(() => {
    if (!isPlaying || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    if (timeLeft !== 0) return;

    if (mode === "focus") {
      setSessionPomodoros((prev) => {
        const newCount = prev + 1;
        const shouldTakeLongBreak = newCount % 4 === 0;

        editTaskRef.current(taskRef.current.id, {
          pomodorosCompleted: taskRef.current.pomodorosCompleted + 1,
        });

        if (shouldTakeLongBreak) {
          setMode("longBreak");
          setTimeLeft(LONG_BREAK_DURATION);
        } else {
          setMode("shortBreak");
          setTimeLeft(SHORT_BREAK_DURATION);
        }
        setIsPlaying(false);

        return newCount;
      });
    } else if (mode === "shortBreak" || mode === "longBreak") {
      setMode("focus");
      setTimeLeft(FOCUS_DURATION);
      setIsPlaying(false);
    }
  }, [timeLeft, mode, FOCUS_DURATION, SHORT_BREAK_DURATION, LONG_BREAK_DURATION]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentDuration =
    mode === "focus"
      ? FOCUS_DURATION
      : mode === "shortBreak"
      ? SHORT_BREAK_DURATION
      : LONG_BREAK_DURATION;
  const progress = (currentDuration - timeLeft) / currentDuration;

  const getModeText = () => {
    if (mode === "focus") return "Foco";
    if (mode === "shortBreak") return "Intervalo Curto";
    return "Intervalo Longo";
  };

  const handleSkip = () => {
    setIsPlaying(false);

    if (mode === "focus") {
      const newPomodoroCount = sessionPomodoros + 1;

      setSessionPomodoros(newPomodoroCount);
      editTask(task.id, {
        pomodorosCompleted: task.pomodorosCompleted + 1,
      });

      const shouldTakeLongBreak = newPomodoroCount % 4 === 0;

      if (shouldTakeLongBreak) {
        setMode("longBreak");
        setTimeLeft(LONG_BREAK_DURATION);
      } else {
        setMode("shortBreak");
        setTimeLeft(SHORT_BREAK_DURATION);
      }
    } else if (mode === "shortBreak" || mode === "longBreak") {
      setMode("focus");
      setTimeLeft(FOCUS_DURATION);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTimeLeft(currentDuration);
  };

  const switchToMode = (newMode: "focus" | "shortBreak" | "longBreak") => {
    setIsPlaying(false);
    setMode(newMode);
    if (newMode === "focus") {
      setTimeLeft(FOCUS_DURATION);
    } else if (newMode === "shortBreak") {
      setTimeLeft(SHORT_BREAK_DURATION);
    } else {
      setTimeLeft(LONG_BREAK_DURATION);
    }
  };

  const getModeColors = () => {
    if (mode === "focus")
      return {
        primary: "bg-red-600 hover:bg-red-500",
        text: "text-red-500",
        progressBar: "bg-red-500",
      };
    if (mode === "shortBreak")
      return {
        primary: "bg-green-600 hover:bg-green-500",
        text: "text-green-500",
        progressBar: "bg-green-500",
      };
    return {
      primary: "bg-blue-600 hover:bg-blue-500",
      text: "text-blue-500",
      progressBar: "bg-blue-500",
    };
  };

  const colors = getModeColors();

  return (
    <article className="flex flex-col w-full gap-4 justify-center items-center px-12">
      <Text className={colors.text}>{getModeText()}</Text>
      <Heading as="h2">{formatTime(timeLeft)}</Heading>

      <ProgressBar progress={progress * 100} color={colors.progressBar} />

      <div className="flex items-center justify-center w-full gap-3">
        {/* Reiniciar */}
        <Button
          className={`bg-gray-700 hover:bg-gray-600 text-white p-4 transition-colors`}
          size="personalized"
          rounded="full"
          variant="personalized"
          onClick={handleReset}
        >
          <RotateCcw />
        </Button>
        {/* Iniciar/Pausar */}
        <Button
          className={`bg-blue-600 hover:bg-blue-500 text-white p-6 transition-colors`}
          size="personalized"
          rounded="full"
          variant="personalized"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </Button>
        {/* Pular */}
        <Button
          className={`bg-gray-700 hover:bg-gray-600 text-white p-4 transition-colors`}
          size="personalized"
          rounded="full"
          variant="personalized"
          onClick={handleSkip}
        >
          <SkipForward />
        </Button>
      </div>

      <Text variant="muted" className="text-lg">
        Pomodoros nesta sessão: {sessionPomodoros}
      </Text>

      <div className="flex gap-2 w-full items-center justify-center">
        <Button
          variant="personalized"
          className={`${
            mode === "focus" ? colors.primary : "bg-gray-700 hover:bg-gray-600"
          } text-white`}
          rounded="lg"
          onClick={() => switchToMode("focus")}
        >
          Foco
        </Button>
        <Button
          variant="personalized"
          className={`${
            mode === "shortBreak"
              ? colors.primary
              : "bg-gray-700 hover:bg-gray-600"
          } text-white`}
          rounded="lg"
          onClick={() => switchToMode("shortBreak")}
        >
          Pausa Curta
        </Button>
        <Button
          variant="personalized"
          className={`${
            mode === "longBreak"
              ? colors.primary
              : "bg-gray-700 hover:bg-gray-600"
          } text-white`}
          rounded="lg"
          onClick={() => switchToMode("longBreak")}
        >
          Pausa Longa
        </Button>
      </div>
    </article>
  );
}
