import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LeaderboardEntry } from "../lib/googleSheets";
import ProgressBar from "./ProgressBar";

interface LeaderboardRowProps {
  participant: LeaderboardEntry;
  index: number;
}

export default function LeaderboardRow({
  participant,
  index,
}: LeaderboardRowProps) {
  const rankChange =
    participant.previous_rank && participant.rank
      ? participant.previous_rank - participant.rank
      : 0;

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = {
        1: "bg-gradient-to-br from-[#ffd700] to-[#ffb800] text-white shadow-lg",
        2: "bg-gradient-to-br from-[#c0c0c0] to-[#a8a8a8] text-white shadow-lg",
        3: "bg-gradient-to-br from-[#ff6b35] to-[#ff8c00] text-white shadow-lg",
      };
      return colors[rank as keyof typeof colors];
    }
    return "bg-navy-deep text-cyan-neon border-2 border-cyan-neon glow-cyan";
  };

  const getStatusBadge = () => {
    const statusStyles = {
      active: "bg-cyan-neon/20 text-cyan-neon border border-cyan-neon/50",
      completed: "bg-cyan-soft/20 text-cyan-soft border border-cyan-soft/50",
      "at risk":
        "bg-orange-neon/20 text-orange-neon border border-orange-neon/50",
      failed: "bg-purple-neon/20 text-purple-neon border border-purple-neon/50",
    };

    const status = participant.status?.toLowerCase() || "active";
    return (
      statusStyles[status as keyof typeof statusStyles] || statusStyles.active
    );
  };

  return (
    <div
      className="glassmorphism rounded-xl p-5 mb-3 transition-all duration-300 hover:shadow-glow-cyan-intense hover:scale-[1.01] hover:border-cyan-neon/50 group border border-transparent"
      style={{
        animation: rankChange !== 0 ? "slideIn 0.5s ease-out" : undefined,
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${getRankBadge(
            participant.rank || index + 4,
          )}`}
        >
          {participant.rank || index + 4}
        </div>

        <div className="flex-grow min-w-0 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div>
                <div className="min-w-0 max-w-full">
                  <h3
                    className="text-xl font-bold text-white break-words hyphens-auto"
                    style={{ wordBreak: "break-word" }}
                  >
                    {participant.teamName}
                  </h3>
                </div>
              </div>
              {rankChange !== 0 && (
                <div
                  className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    rankChange > 0
                      ? "bg-cyan-neon/20 text-cyan-neon"
                      : "bg-orange-neon/20 text-orange-neon"
                  }`}
                >
                  {rankChange > 0 ? (
                    <>
                      <TrendingUp className="w-3 h-3" />
                      <span>+{rankChange}</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-3 h-3" />
                      <span>{rankChange}</span>
                    </>
                  )}
                </div>
              )}
              {rankChange === 0 && participant.previous_rank && (
                <Minus className="w-4 h-4 text-white/60" />
              )}
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge()}`}
            >
              {participant.status || "Active"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-white">
            {participant.department && (
              <span className="px-2 py-1 bg-cyan-soft/10 text-cyan-neon rounded-md font-medium border border-cyan-soft/30">
                {participant.department}
              </span>
            )}
          </div>

          <ProgressBar
            current={participant.score}
            max={participant.maxPoints}
            rank={participant.rank || index + 4}
          />
        </div>
      </div>
    </div>
  );
}
