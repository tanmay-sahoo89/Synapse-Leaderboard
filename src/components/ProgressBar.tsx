interface ProgressBarProps {
  current: number;
  max: number;
  rank: number;
  animated?: boolean;
}

export default function ProgressBar({
  current,
  max,
  rank,
  animated = true,
}: ProgressBarProps) {
  const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 0;

  const getBarColor = () => {
    if (rank === 1) return "from-[#ffd700] to-[#ffb800]";
    if (rank === 2) return "from-[#c0c0c0] to-[#a8a8a8]";
    if (rank === 3) return "from-[#ff6b35] to-[#ff8c00]";
    return "from-[#00e5ff] to-[#cc00ff]";
  };

  return (
    <div className="w-full px-4 py-4">
      <div className="flex justify-between items-center mb-4 gap-4">
        <span className="text-sm font-semibold text-white">
          {current} / {max} points
        </span>
        <span className="text-sm font-bold text-cyan-neon">
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="relative w-full h-5 bg-navy-deep rounded-full overflow-hidden border border-cyan-neon/30">
        <div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getBarColor()} rounded-full ${
            animated ? "transition-all duration-500 ease-out" : ""
          }`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
