interface GameOverScreenProps {
  victory: boolean;
  round: number;
  onRestart: () => void;
}

const GameOverScreen = ({ victory, round, onRestart }: GameOverScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-4xl font-serif-display font-light tracking-ritual text-foreground">
        {victory ? 'Victory' : 'Defeat'}
      </h2>
      <p className="text-sm text-muted-foreground tracking-ritual">
        {victory ? 'The connection held.' : `Round ${round} — the link broke.`}
      </p>
      <button
        onClick={onRestart}
        className="
          mt-4 px-5 py-1
          border border-primary/40 
          text-primary 
          font-serif-display text-base tracking-ritual
          transition-all duration-300
          hover:border-primary hover:bg-primary/5
        "
      >
        Again
      </button>
    </div>
  );
};

export default GameOverScreen;
