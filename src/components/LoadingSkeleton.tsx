export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-end justify-center gap-8 mb-12 flex-wrap lg:flex-nowrap px-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="glassmorphism rounded-2xl w-full max-w-md h-80 mb-6 border border-cyan-neon/20" />
            <div
              className={`bg-gradient-to-t from-cyan-neon to-purple-neon w-36 rounded-t-2xl ${i === 2 ? "h-52" : i === 1 ? "h-36" : "h-28"}`}
            />
          </div>
        ))}
      </div>

      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="glassmorphism rounded-xl p-5 border border-cyan-neon/20"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-navy-deep rounded-full border border-cyan-neon/30" />
            <div className="flex-grow space-y-2">
              <div className="h-6 bg-navy-deep rounded w-1/3 border border-cyan-neon/20" />
              <div className="h-4 bg-navy-deep rounded w-1/4 border border-cyan-neon/20" />
              <div className="h-3 bg-navy-deep rounded w-full mt-3 border border-cyan-neon/20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
