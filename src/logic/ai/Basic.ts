import { BoardLogic } from "../BoardLogic";

export class BasicAI {
	play(board: BoardLogic): number {
		const emptyCells = board.getLegalMoves();

		return emptyCells[0];
	}
}
