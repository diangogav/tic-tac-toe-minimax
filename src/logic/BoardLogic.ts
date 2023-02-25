/* eslint-disable no-console */
import { TicTacToePieces } from "./TicTacToePieces";

export class BoardLogic {
	public values: string[] = [];
	private readonly turn: TicTacToePieces;
	private readonly winCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[6, 4, 2],
	];

	constructor(values: string[], turn: TicTacToePieces) {
		this.values = values;
		this.turn = turn || TicTacToePieces.PLAYER;
	}

	static create(values: string[], turn: TicTacToePieces): BoardLogic {
		const state = [...values];

		return new BoardLogic(state, turn);
	}

	move(location: number): BoardLogic {
		const boardCopy = [...this.values];
		boardCopy[location] = this.turn;

		if (this.turn === TicTacToePieces.PLAYER) {
			return BoardLogic.create(boardCopy, TicTacToePieces.AI);
		}

		return BoardLogic.create(boardCopy, TicTacToePieces.PLAYER);
	}

	getLegalMoves(): number[] {
		return this.values
			.map((item, index) => {
				if (!item) {
					return index;
				}

				return -1;
			})
			.filter((item) => item !== -1);
	}

	isWin(): boolean {
		const aiWon = this.winner(TicTacToePieces.AI);
		const playerWon = this.winner(TicTacToePieces.PLAYER);
		if (aiWon || playerWon) {
			return true;
		}

		return false;
	}

	isDraw(): boolean {
		return this.getLegalMoves().length === 0;
	}

	getTurn(): TicTacToePieces {
		return this.turn;
	}

	evaluate(player: TicTacToePieces): number {
		if (this.isWin() && this.turn === player) {
			return -1;
		}
		if (this.isWin() && this.turn !== player) {
			return 1;
		}

		return 0;
	}

	private winner(player: TicTacToePieces) {
		const plays = this.values
			.map((play, index) => {
				if (play === player) {
					return index;
				}

				return -1;
			})
			.filter((index) => index !== -1);

		return this.winCombos
			.map((winCombo) => {
				return winCombo.every((item) => plays.includes(item));
			})
			.some((value) => value);
	}
}
