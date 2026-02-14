interface LivesDisplayProps {
  lives: number;
  maxLives?: number;
}

const LivesDisplay = ({ lives, maxLives = 3 }: LivesDisplayProps) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxLives }, (_, i) => (
        <span
          key={i}
          className={`text-sm transition-opacity duration-500 ${
            i < lives ? 'text-primary opacity-100' : 'text-muted-foreground opacity-25'
          }`}
        >
          ◆
        </span>
      ))}
    </div>
  );
};

export default LivesDisplay;
