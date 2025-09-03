

export type Player = 'red' | 'black';
// Fix: Expanded GameMode to include all new game modes.
export type GameMode = 'skill' | 'draft' | 'resource' | 'oneDieChoice' | 'lucky7' | 'classic' | 'doubleRoll';

export interface BoardPoint {
  checkers: number;
  player: Player | null;
}

export interface GameState {
  points: BoardPoint[];
  bar: { red: number; black: number };
  off: { red: number; black: number };
  turn: Player;
  dice: number[];
  movesLeft: number[];
  selectedPip: number | 'bar' | null;
  winner: Player | null;
  winType: 'gammon' | null;
  // Fix: Expanded phase to include states for all new game modes.
  phase: 'choosing' | 'moving' | 'gameover' | 'rolling' | 'drafting' | 'choosingSecondDie' | 'awaitingLucky7Decision' | 'choosingDoubleRoll';
  currentAIRationale: string | null;
  availableChoices: {
    red: number[];
    black: number[];
  };
  gameMode: GameMode;
  lastMove: Move | null;
  // Fix: Added optional properties to support different game mode mechanics.
  draftOptions?: number[][];
  rerollTokens?: { red: number; black: number };
  rolledDie?: number | null;
}

export interface Move {
  from: number | 'bar';
  to: number | 'off';
  die: number;
  reasoning?: string;
}

// --- ACTION TYPE DEFINITION ---
// Fix: Added all new action types for different game modes.
export type Action =
  | { type: 'CHOOSE_DICE_VALUES'; payload: number[] }
  | { type: 'PIP_CLICK'; payload: number | 'bar' | 'off' }
  | { type: 'MOVE_CHECKER'; payload: Move }
  | { type: 'END_TURN' }
  | { type: 'SETUP_TEST_STATE' }
  | { type: 'ROLL_DICE' }
  | { type: 'CHOOSE_DRAFT_DICE'; payload: number[] }
  | { type: 'USE_REROLL_TOKEN' }
  | { type: 'CHOOSE_SECOND_DIE'; payload: number }
  | { type: 'ACCEPT_LUCKY_7_ROLL' }
  | { type: 'REROLL_LUCKY_7' }
  | { type: 'CHOOSE_DOUBLE_ROLL'; payload: number[] };


// --- MODULAR LOGIC INTERFACE ---
// This interface defines the "contract" for the game mode's logic file.
// Fix: Added optional handlers for new game mode actions.
export interface GameModeLogic {
  // Determines the starting phase for a turn.
  getInitialPhase: (player: Player) => GameState['phase'];

  // Custom reducer logic for specific actions.
  handleChooseDiceValues?: (state: GameState, payload: number[]) => GameState;
  handleRollDice?: (state: GameState) => GameState;
  handleChooseDraftDice?: (state: GameState, payload: number[]) => GameState;
  handleUseRerollToken?: (state: GameState) => GameState;
  handleChooseSecondDie?: (state: GameState, payload: number) => GameState;
  handleAcceptLucky7Roll?: (state: GameState) => GameState;
  handleRerollLucky7?: (state: GameState) => GameState;
  handleChooseDoubleRoll?: (state: GameState, payload: number[]) => GameState;
  
  // A lifecycle hook that runs at the end of a turn to prepare the state for the *next* turn.
  onTurnEnd: (state: GameState) => GameState;

  // AI handler that returns a sequence of actions for the AI to perform.
  getAIActions: (state: GameState) => Action[];
}