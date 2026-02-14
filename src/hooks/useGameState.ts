import { useState, useCallback, useRef, useEffect } from 'react';

export interface GameState {
  phase: 'setup' | 'playing' | 'passing' | 'gameover' | 'victory';
  playerCount: number;
  currentPlayerIndex: number;
  deck: number[];
  playerHands: number[][];
  playedCards: number[];
  lives: number;
  round: number;
  silenceActive: boolean;
  silenceExiting: boolean;
  lastPlayResult: 'none' | 'success' | 'error';
}

function shuffleDeck(): number[] {
  const cards = Array.from({ length: 100 }, (_, i) => i + 1);
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export function useGameState() {
  const [state, setState] = useState<GameState>({
    phase: 'setup',
    playerCount: 2,
    currentPlayerIndex: 0,
    deck: [],
    playerHands: [],
    playedCards: [],
    lives: 3,
    round: 1,
    silenceActive: false,
    silenceExiting: false,
    lastPlayResult: 'none',
  });

  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const silenceTriggeredThisRound = useRef(false);

  const startGame = useCallback((playerCount: number) => {
    const deck = shuffleDeck();
    const hands: number[][] = [];
    for (let i = 0; i < playerCount; i++) {
      hands.push([deck.pop()!]);
    }
    setState({
      phase: 'playing',
      playerCount,
      currentPlayerIndex: 0,
      deck,
      playerHands: hands,
      playedCards: [],
      lives: 3,
      round: 1,
      silenceActive: false,
      silenceExiting: false,
      lastPlayResult: 'none',
    });
    silenceTriggeredThisRound.current = false;
  }, []);

  const triggerSilence = useCallback(() => {
    if (silenceTriggeredThisRound.current) return;
    silenceTriggeredThisRound.current = true;

    setState(s => ({ ...s, silenceActive: true, silenceExiting: false }));

    silenceTimerRef.current = setTimeout(() => {
      setState(s => ({ ...s, silenceActive: false, silenceExiting: true }));
      setTimeout(() => {
        setState(s => ({ ...s, silenceExiting: false }));
      }, 1200);
    }, 7000);
  }, []);

  // Random silence trigger per round
  useEffect(() => {
    if (state.phase !== 'playing') return;
    if (silenceTriggeredThisRound.current) return;

    // 40% chance to trigger silence, delayed randomly 2-8 seconds into the round
    if (Math.random() < 0.4) {
      const delay = 2000 + Math.random() * 6000;
      const timer = setTimeout(triggerSilence, delay);
      return () => clearTimeout(timer);
    }
  }, [state.round, state.phase, triggerSilence]);

  const playCard = useCallback((cardValue: number) => {
    setState(prev => {
      const lastPlayed = prev.playedCards.length > 0 ? prev.playedCards[prev.playedCards.length - 1] : 0;
      const isError = cardValue < lastPlayed;

      const newLives = isError ? prev.lives - 1 : prev.lives;
      const newPlayedCards = [...prev.playedCards, cardValue];
      const newHands = prev.playerHands.map((hand, i) =>
        i === prev.currentPlayerIndex ? hand.filter(c => c !== cardValue) : hand
      );

      if (newLives <= 0) {
        return {
          ...prev,
          playedCards: newPlayedCards,
          playerHands: newHands,
          lives: 0,
          phase: 'gameover',
          lastPlayResult: 'error',
        };
      }

      // Check if all hands are empty (round over)
      const allEmpty = newHands.every(h => h.length === 0);

      if (allEmpty) {
        // Check if deck is exhausted for victory
        if (prev.deck.length < prev.playerCount) {
          return {
            ...prev,
            playedCards: newPlayedCards,
            playerHands: newHands,
            lives: newLives,
            phase: 'victory',
            lastPlayResult: isError ? 'error' : 'success',
          };
        }

        // Deal next round
        const newDeck = [...prev.deck];
        const nextHands: number[][] = [];
        const cardsPerPlayer = Math.min(prev.round + 1, 7); // Scale up cards per round
        for (let i = 0; i < prev.playerCount; i++) {
          const hand: number[] = [];
          for (let c = 0; c < cardsPerPlayer && newDeck.length > 0; c++) {
            hand.push(newDeck.pop()!);
          }
          hand.sort((a, b) => a - b);
          nextHands.push(hand);
        }

        silenceTriggeredThisRound.current = false;

        return {
          ...prev,
          deck: newDeck,
          playedCards: [],
          playerHands: nextHands,
          lives: newLives,
          round: prev.round + 1,
          currentPlayerIndex: 0,
          phase: 'passing',
          silenceActive: false,
          silenceExiting: false,
          lastPlayResult: isError ? 'error' : 'success',
        };
      }

      // Move to next player
      const nextPlayer = (prev.currentPlayerIndex + 1) % prev.playerCount;

      return {
        ...prev,
        playedCards: newPlayedCards,
        playerHands: newHands,
        lives: newLives,
        currentPlayerIndex: nextPlayer,
        phase: 'passing',
        lastPlayResult: isError ? 'error' : 'success',
      };
    });
  }, []);

  const confirmReady = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'playing', lastPlayResult: 'none' }));
  }, []);

  const resetGame = useCallback(() => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    setState(s => ({
      ...s,
      phase: 'setup',
      silenceActive: false,
      silenceExiting: false,
    }));
    silenceTriggeredThisRound.current = false;
  }, []);

  return { state, startGame, playCard, confirmReady, resetGame };
}
