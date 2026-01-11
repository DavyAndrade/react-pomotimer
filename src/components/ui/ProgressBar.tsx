type ProgressBarProps = {
  progress: number;
  color?: string;
};

export default function ProgressBar({ progress, color = "bg-blue-400" }: ProgressBarProps) {
  return (
    <div className="w-full h-2 bg-gray-700 rounded-md overflow-hidden">
      <div
        className={`h-full ${color}`}
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  );
}
