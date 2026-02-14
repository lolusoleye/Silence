import LivesDisplay from './LivesDisplay';
import GameCard from './GameCard';
import PulseRing from './PulseRing';
import type { GameState } from '@/hooks/useGameState';

interface GameBoardProps {
  state: GameState;
  onPlayCard: (value: number) => void;
}

const GameBoard = ({ state, onPlayCard }: GameBoardProps) => {
  const currentHand = state.playerHands[state.currentPlayerIndex] || [];

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-6 px-2 relative">
      {/* Error flash overlay */}
      {state.lastPlayResult === 'error' && (
        <div className="fixed inset-0 bg-destructive/20 animate-error-flash pointer-events-none z-30" />
      )}

      {/* Gold glow on success after silence */}
      {state.lastPlayResult === 'success' && (
        <div className="fixed inset-0 animate-gold-glow pointer-events-none z-30" />
      )}

      {/* Top: Lives + Round */}
      <div className="flex flex-col items-center gap-1">
        <LivesDisplay lives={state.lives} />
        <span className="text-xs text-muted-foreground tracking-ritual">
          Round {state.round}
        </span>
      </div>

      {/* Played cards */}
      <div className="flex items-center justify-center gap-1 flex-wrap min-h-[120px] my-2">
        {state.playedCards.length === 0 ? (
          <span className="text-muted-foreground/30 text-sm font-serif-display tracking-ritual">
            —
          </span>
        ) : (
          state.playedCards.slice(-8).map((card, i) => (
            <GameCard key={`${card}-${i}`} value={card} played />
          ))
        )}
      </div>

      {/* Pulse ring */}
      <PulseRing silenceActive={state.silenceActive} />

      {/* Current player indicator */}
      <p className="text-xs text-muted-foreground tracking-ritual mb-2">
        Player {state.currentPlayerIndex + 1}
      </p>

      {/* Player hand */}
      <div className="flex items-center justify-center gap-1 flex-wrap pb-2">
        {currentHand.map(card => (
          <GameCard
            key={card}
            value={card}
            onClick={() => onPlayCard(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
