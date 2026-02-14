import { useGameState } from '@/hooks/useGameState';
import SetupScreen from '@/components/game/SetupScreen';
import GameBoard from '@/components/game/GameBoard';
import PassScreen from '@/components/game/PassScreen';
import SilenceOverlay from '@/components/game/SilenceOverlay';
import GameOverScreen from '@/components/game/GameOverScreen';

const Index = () => {
  const { state, startGame, playCard, confirmReady, resetGame } = useGameState();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {state.phase === 'setup' && (
        <SetupScreen onStart={startGame} />
      )}

      {(state.phase === 'playing' || state.phase === 'passing') && (
        <>
          <GameBoard state={state} onPlayCard={playCard} />
          <SilenceOverlay active={state.silenceActive} exiting={state.silenceExiting} />
          {state.phase === 'passing' && (
            <PassScreen
              nextPlayer={state.currentPlayerIndex + 1}
              onReady={confirmReady}
            />
          )}
        </>
      )}

      {(state.phase === 'gameover' || state.phase === 'victory') && (
        <GameOverScreen
          victory={state.phase === 'victory'}
          round={state.round}
          onRestart={resetGame}
        />
      )}
    </div>
  );
};

export default Index;
