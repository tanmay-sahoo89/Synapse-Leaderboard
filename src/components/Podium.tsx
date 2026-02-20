import { Trophy, Medal } from "lucide-react";
import { LeaderboardEntry } from "../lib/googleSheets";
import ProgressBar from "./ProgressBar";

interface PodiumProps {
  topThree: LeaderboardEntry[];
}

export default function Podium({ topThree }: PodiumProps) {
  const [first, second, third] = topThree;

  const PodiumCard = ({
    participant,
    position,
    height,
  }: {
    participant?: LeaderboardEntry;
    position: number;
    height: string;
  }) => {
    if (!participant) return null;

    const medals = {
      1: {
        icon: Trophy,
        color: "text-[#ffd700]",
        label: "CHAMPION",
        gradient: "from-[#ffd700] to-[#ffb800]",
      },
      2: {
        icon: Medal,
        color: "text-[#c0c0c0]",
        label: "RUNNER-UP",
        gradient: "from-[#c0c0c0] to-[#a8a8a8]",
      },
      3: {
        icon: Medal,
        color: "text-[#ff6b35]",
        label: "THIRD PLACE",
        gradient: "from-[#ff6b35] to-[#ff8c00]",
      },
    };

    const medal = medals[position as keyof typeof medals];
    const Icon = medal.icon;

    const podiumGradients = {
      1: "from-[#ffd700] to-[#ffb800]",
      2: "from-[#c0c0c0] to-[#a8a8a8]",
      3: "from-[#ff6b35] to-[#ff8c00]",
    };

    return (
      <div className="flex flex-col items-center">
        <div className="glassmorphism relative rounded-2xl shadow-2xl p-5 w-full max-w-2xl transition-all duration-500 hover:shadow-glow-cyan-intense hover:-translate-y-3 border border-cyan-neon/40">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br ${
                podiumGradients[position as keyof typeof podiumGradients]
              } shadow-2xl animate-pulse`}
            >
              <Icon className={`w-10 h-10 ${medal.color}`} />
            </div>
          </div>

          <div className="mt-8 text-center">
            <div
              className={`text-xs font-bold text-cyan-soft mb-2 tracking-wider`}
            >
              {medal.label}
            </div>
            <div className="mb-4">
              <h3
                className="text-2xl font-bold text-white break-words hyphens-auto"
                style={{ wordBreak: "break-word" }}
              >
                {participant.teamName}
              </h3>
            </div>

            <div
              className={`my-4 py-5 px-6 bg-gradient-to-r ${medal.gradient} rounded-xl shadow-lg relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/10"></div>
              <div className="relative">
                <div className="text-4xl font-bold text-white">
                  {participant.score}
                </div>
                <div className="text-xs text-white/80 mt-1">POINTS</div>
              </div>
            </div>

            <div className="mb-4">
              <ProgressBar
                current={participant.score}
                max={participant.maxPoints}
                rank={position}
              />
            </div>

            {participant.department && (
              <div className="bg-cyan-soft/10 rounded-lg p-3 border border-cyan-soft/30">
                <div className="text-xs text-white">Department</div>
                <div className="text-sm font-semibold text-cyan-soft truncate">
                  {participant.department}
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className={`mt-2 ${height} w-36 bg-gradient-to-t ${
            podiumGradients[position as keyof typeof podiumGradients]
          } rounded-t-2xl shadow-2xl flex items-center justify-center relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-white/10"></div>
          <span className="text-6xl font-bold text-white opacity-40 relative z-10">
            {position}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-end justify-center gap-6 mb-8 flex-wrap lg:flex-nowrap px-4">
      <div className="order-2 lg:order-1">
        <PodiumCard participant={second} position={2} height="h-24" />
      </div>

      <div className="order-1 lg:order-2">
        <PodiumCard participant={first} position={1} height="h-36" />
      </div>

      <div className="order-3">
        <PodiumCard participant={third} position={3} height="h-20" />
      </div>
    </div>
  );
}
