type ProgressBarProps = {
  progress: number;
  color?: string;
};

export function ProgressBar({
  progress,
  color = "bg-blue-400",
}: ProgressBarProps) {
  return (
    <div className="w-full h-2 bg-gray-700 rounded-md overflow-hidden transition ease-in-out">
      <div
        className={`h-full ${color} transition-all duration-1250 ease-linear`}
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  );
}
