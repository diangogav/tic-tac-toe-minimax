import { BoardLogic } from "../BoardLogic";
import { TicTacToePieces } from "../TicTacToePieces";

export class MinimaxAI {
	minimax(
		board: BoardLogic,
		maximing: boolean,
		originalPlayer: TicTacToePieces,
		maxDepth: number
	): number {
		if (board.isWin() || board.isDraw() || maxDepth === 0) {
			const score = board.evaluate(originalPlayer);

			return score;
		}

		if (maximing) {
			let value = -99999999999999;
			for (const move of board.getLegalMoves()) {
				const score = this.minimax(board.move(move), false, originalPlayer, maxDepth - 1);
				if (score > value) {
					value = score;
				}
			}

			return value;
		}
		let value = 99999999999999;
		for (const move of board.getLegalMoves()) {
			const score = this.minimax(board.move(move), true, originalPlayer, maxDepth - 1);
			if (score < value) {
				value = score;
			}
		}

		return value;
	}

	play(board: BoardLogic): number | null {
		let bestValue = -9999999999;
		let bestMove: number | null = null;
		const availableMoves = board.getLegalMoves();
		for (const move of availableMoves) {
			const result = this.minimax(board.move(move), false, board.getTurn(), 9);

			if (result > bestValue) {
				bestValue = result;
				bestMove = move;
			}
		}

		return bestMove;
	}
}
