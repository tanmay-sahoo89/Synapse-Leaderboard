import { Brain, WifiOff, Wifi, RefreshCw } from "lucide-react";

interface HeaderProps {
  lastUpdated: Date | null;
  isOnline: boolean;
  totalParticipants: number;
  onRefresh?: () => void;
}

export default function Header({
  lastUpdated,
  isOnline,
  totalParticipants,
  onRefresh,
}: HeaderProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <header className="bg-gradient-to-r from-[#00e5ff] via-[#cc00ff] to-[#00e5ff] text-white py-8 px-6 rounded-2xl shadow-2xl mb-8 relative overflow-hidden glow-cyan">
      <div className="absolute inset-0 bg-white/5"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#ffd700] to-[#ffb800] rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-9 h-9 text-white drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg">
                Synapse Showdown
              </h1>
              <p className="text-white text-sm mt-1 font-medium drop-shadow-md">
                AIML Quiz Championship - Live Leaderboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm border border-white/30">
              <div className="text-3xl font-bold text-white drop-shadow-lg">
                {totalParticipants}
              </div>
              <div className="text-xs text-white/90 drop-shadow-md">
                Participants
              </div>
            </div>

            <div className="h-14 w-px bg-white/40" />

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <>
                    <div className="relative">
                      <Wifi className="w-5 h-5 text-white drop-shadow-lg" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping" />
                    </div>
                    <span className="text-sm font-bold text-white drop-shadow-lg">
                      LIVE
                    </span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-5 h-5 text-orange-neon drop-shadow-lg" />
                    <span className="text-sm font-bold text-orange-neon drop-shadow-lg">
                      OFFLINE
                    </span>
                  </>
                )}
              </div>

              {lastUpdated && (
                <div className="text-xs text-white/90 font-medium drop-shadow-md">
                  Updated: {formatTime(lastUpdated)}
                </div>
              )}
            </div>

            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-3 bg-[#ffd700] hover:bg-[#ffb800] rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                title="Refresh data"
              >
                <RefreshCw className="w-5 h-5 text-white drop-shadow-lg" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
