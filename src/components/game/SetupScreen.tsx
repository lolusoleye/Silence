import { useState } from 'react';

interface SetupScreenProps {
  onStart: (playerCount: number) => void;
}

const SetupScreen = ({ onStart }: SetupScreenProps) => {
  const [count, setCount] = useState(2);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-5xl font-serif-display font-light text-foreground tracking-ritual">
        The Mind
      </h1>
      <p className="text-sm text-muted-foreground tracking-ritual">
        A game of tension and silence
      </p>

      <div className="mt-6 flex flex-col items-center gap-3">
        <span className="text-xs text-muted-foreground tracking-ritual uppercase">
          Players
        </span>
        <div className="flex gap-2">
          {[2, 3, 4].map(n => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`
                w-5 h-5 
                flex items-center justify-center
                border font-serif-display text-lg
                transition-all duration-300
                ${count === n
                  ? 'border-primary text-primary'
                  : 'border-border text-muted-foreground hover:border-muted-foreground'
                }
              `}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onStart(count)}
        className="
          mt-4 px-5 py-1
          border border-primary/40 
          text-primary 
          font-serif-display text-base tracking-ritual
          transition-all duration-300
          hover:border-primary hover:bg-primary/5
        "
      >
        Begin
      </button>
    </div>
  );
};

export default SetupScreen;
