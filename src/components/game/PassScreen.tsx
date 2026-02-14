interface PassScreenProps {
  nextPlayer: number;
  onReady: () => void;
}

const PassScreen = ({ nextPlayer, onReady }: PassScreenProps) => {
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95">
      <p className="text-lg font-serif-display text-muted-foreground tracking-ritual mb-4">
        Pass to Player {nextPlayer}
      </p>
      <button
        onClick={onReady}
        className="
          px-4 py-1 
          border border-primary/40 
          text-primary 
          font-serif-display text-base tracking-ritual
          transition-all duration-300
          hover:border-primary hover:bg-primary/5
        "
      >
        Ready
      </button>
    </div>
  );
};

export default PassScreen;
