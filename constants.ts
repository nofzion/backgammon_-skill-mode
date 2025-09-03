// Colors
export const BOARD_COLOR = '#D1A972'; // Light brown / wood tone
export const RED_POINT_COLOR = '#C80000';
export const BLACK_POINT_COLOR = '#1F2937';
export const BAR_COLOR = '#8B4513'; // SaddleBrown for a wood-like center bar
export const ACTIVE_POINT_COLOR = '#FBBF24'; // Amber/Yellow for hovered/selected points
export const VALID_MOVE_COLOR = '#86EFAC'; // Green for valid move destinations
export const BACKGROUND_COLOR = '#000000';
export const RED_CHECKER_COLOR = '#DC2626';
export const BLACK_CHECKER_COLOR = '#111827';


// Dimensions
export const CANVAS_SIZE = 5200;
export const BOARD_PADDING = 200;
export const BAR_WIDTH = 340;

// Derived Dimensions
export const EFFECTIVE_WIDTH = CANVAS_SIZE - 2 * BOARD_PADDING;
export const EFFECTIVE_HEIGHT = CANVAS_SIZE - 2 * BOARD_PADDING;
export const POINT_WIDTH = (EFFECTIVE_WIDTH - BAR_WIDTH) / 12;
export const POINT_HEIGHT = EFFECTIVE_HEIGHT / 2 * 0.85; // Make points slightly shorter than half height for spacing
export const CHECKER_DIAMETER = Math.min(POINT_WIDTH * 0.8, 270);

// Animation
export const PULSE_SPEED = 0.003;
export const MAX_PULSE_HEIGHT = 7;

// Game
export const PLAYER_HOME: { [key: string]: readonly number[] } = {
    red: [0, 1, 2, 3, 4, 5], // Red's home board (pips 1-6)
    black: [18, 19, 20, 21, 22, 23], // Black's home board (pips 19-24)
};