interface GameCardProps {
  value: number;
  onClick?: () => void;
  played?: boolean;
}

const GameCard = ({ value, onClick, played }: GameCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={played}
      className={`
        relative flex items-center justify-center
        w-[72px] h-[104px]
        rounded-sm
        border border-game-card-border
        transition-all duration-300 ease-out
        font-serif-display
        ${played
          ? 'bg-card text-muted-foreground border-border opacity-60 cursor-default text-2xl'
          : 'bg-game-card text-game-card-number cursor-pointer text-3xl hover:shadow-[0_0_24px_-4px_hsl(var(--game-card-border)/0.3)]'
        }
      `}
    >
      <span className="font-semibold select-none">{value}</span>
    </button>
  );
};

export default GameCard;
