export default function Loading() {
  return (
    <main className="min-h-screen bg-black p-6 font-mono">
      {/* Header Skeleton - Tanpa Animasi biar kokoh */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-5 h-5 bg-zinc-800 rounded-full"></div>
        <div className="h-6 w-32 bg-zinc-800 rounded"></div>
      </div>
      
      {/* Stat Card Skeleton */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl mb-8 animate-pulse">
        <div className="h-3 w-20 bg-zinc-800 rounded mb-3"></div>
        <div className="h-10 w-48 bg-zinc-800 rounded mb-4"></div>
        <div className="h-3 w-32 bg-zinc-800 rounded"></div>
      </div>

      {/* Title Skeleton */}
      <div className="h-4 w-40 bg-zinc-800 rounded mb-4"></div>
      
      {/* Transaction List Skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className="h-16 w-full bg-zinc-900/50 border border-zinc-800 rounded-lg animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }} // Trik: animasi berurutan biar lebih halus
          ></div>
        ))}
      </div>
    </main>
  )
}
