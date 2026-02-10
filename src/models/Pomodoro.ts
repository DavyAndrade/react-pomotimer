export type PomodoroMode = "focus" | "shortBreak" | "longBreak";

export interface PomodoroTimer {
  mode: PomodoroMode;
  timeLeft: number;
  isRunning: boolean;
  cycleCount: number;
}

export interface PomodoroSettings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  cyclesUntilLongBreak: number;
}
