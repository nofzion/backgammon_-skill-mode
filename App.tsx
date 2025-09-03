
import React, { useMemo } from 'react';
import { BackgammonBoard } from './components/BackgammonBoard.tsx';
import { BearOffTray } from './components/BearOffTray.tsx';
import { GameUI } from './components/GameUI.tsx';
import { BACKGROUND_COLOR } from './constants.ts';
import { useBackgammonGame } from './game/useBackgammonGame.ts';
import type { Move } from './types.ts';
import { findPossibleMoves } from './game/rules.ts';

const App: React.FC = () => {
  const { state, dispatch } = useBackgammonGame();

  const possibleMoves: Move[] = useMemo(() => {
    // Only calculate moves during the moving phase for efficiency.
    if (state.phase !== 'moving') return [];
    return findPossibleMoves(state);
  }, [state]); // Re-calculate whenever the state changes.

  const handleBearOffClick = () => {
    // Only dispatch if it's a valid move for the human player
    if (
      state.turn === 'red' && 
      state.selectedPip !== null &&
      possibleMoves.some(m => m.from === state.selectedPip && m.to === 'off')
    ) {
        dispatch({ type: 'PIP_CLICK', payload: 'off' });
    }
  };
  
  const isRedBearOffTarget = state.turn === 'red' && possibleMoves.some(m => m.from === state.selectedPip && m.to === 'off');

  return (
    <main
        className="flex flex-row items-center justify-center min-h-screen w-full p-4 gap-8"
        style={{ backgroundColor: BACKGROUND_COLOR }}
    >
      <BearOffTray 
        player="black"
        count={state.off.black}
        isTarget={false} // AI doesn't use UI to move
        onClick={() => {}} 
      />
      <GameUI state={state} dispatch={dispatch} />
      <BackgammonBoard state={state} dispatch={dispatch} possibleMoves={possibleMoves} />
      <BearOffTray 
        player="red"
        count={state.off.red}
        isTarget={isRedBearOffTarget}
        onClick={handleBearOffClick} 
      />
    </main>
  );
}

export default App;