export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 32 38" 
      className={className}
    >
      <defs>
        {/* Vibrant Gradient for the Letter B */}
        <linearGradient id="b-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" /> {/* blue-600 */}
          <stop offset="100%" stopColor="#4f46e5" /> {/* indigo-600 */}
        </linearGradient>
        
        {/* Bright Green Gradient for the Bookmark */}
        <linearGradient id="mark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" /> {/* emerald-400 */}
          <stop offset="100%" stopColor="#059669" /> {/* emerald-600 */}
        </linearGradient>

        {/* Soft shadow for the bookmark */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* The Letter B - using stroke for perfectly consistent thickness everywhere */}
      <path 
        d="M 8 28 V 4 h 8 a 6 6 0 0 1 0 12 H 8 h 9 a 6 6 0 0 1 0 12 H 8" 
        stroke="url(#b-grad)" 
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* The Bookmark dropping from the bottom hole, moved slightly down to create negative space */}
      <path 
        d="M 13 19 h 6 v 17 l -3 -3 l -3 3 z" 
        fill="url(#mark-grad)" 
        filter="url(#shadow)"
      />
    </svg>
  );
}
