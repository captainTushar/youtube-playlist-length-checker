import type React from "react";

interface PlaylistInfoProps {
  title: string;
  totalVideos: number;
  totalDuration: string;
  totalSeconds: number; // for speed calculations
}

const PlaylistInfo: React.FC<PlaylistInfoProps> = ({ title, totalVideos, totalDuration, totalSeconds }) => {
  const speeds = [1.25, 1.5, 1.75, 2];

  const formatAtSpeed = (seconds: number, speed: number) => {
    const adjusted = seconds / speed;
    const h = Math.floor(adjusted / 3600);
    const m = Math.floor((adjusted % 3600) / 60);
    const s = Math.floor(adjusted % 60);
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-2xl mt-8 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <span className="text-gray-300 font-medium">Total Videos:</span>
          <span className="text-blue-400 font-bold text-lg">{totalVideos.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <span className="text-gray-300 font-medium">Total Duration:</span>
          <span className="text-purple-400 font-bold text-lg">{totalDuration}</span>
        </div>

        <div className="mt-4">
          <p className="text-gray-300 font-semibold mb-2">Estimated Watch Time:</p>
          {speeds.map((speed) => (
            <div
              key={speed}
              className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg border border-gray-700/50 mb-1"
            >
              <span className="text-gray-300">{speed}x:</span>
              <span className="text-green-400 font-bold">{formatAtSpeed(totalSeconds, speed)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistInfo;
