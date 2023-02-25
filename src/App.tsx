/* eslint-disable no-console */
import { useState } from "react";

import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoard } from "./components/ScoreBoard";
import { MinimaxAI } from "./logic/ai/Minimax";
import { BoardLogic } from "./logic/BoardLogic";
import { TicTacToePieces } from "./logic/TicTacToePieces";

export function App() {
	const emptyBoard: string[] = Array(9).fill("") as string[];
	const initialboardLogic = new BoardLogic(emptyBoard, TicTacToePieces.PLAYER);
	const [board, setBoard] = useState(initialboardLogic.values);
	const [boardLogic, setBoardLogic] = useState(initialboardLogic);
	const [gameOver, setGameOver] = useState(false);
	const [scores, setScores] = useState({ player: 0, ai: 0 });

	const resetBoard = () => {
		const emptyBoard: string[] = Array(9).fill("") as string[];
		const initialboardLogic = new BoardLogic(emptyBoard, TicTacToePieces.PLAYER);
		setBoardLogic(initialboardLogic);
		setBoard(initialboardLogic.values);
		setGameOver(false);
	};

	const handleBoxClick = (cellIndex: number) => {
		const updatedBoard = boardLogic.move(cellIndex);
		setBoardLogic(updatedBoard);
		setBoard(updatedBoard.values);

		if (updatedBoard.isWin()) {
			setGameOver(true);
			let { player } = scores;
			player++;
			setScores({ ...scores, player });

			return;
		}

		if (updatedBoard.isDraw()) {
			setGameOver(true);

			return;
		}

		// const ai = new BasicAI();
		const ai = new MinimaxAI();
		const aiMove = ai.play(updatedBoard);
		if (aiMove === null) {
			setGameOver(true);

			return;
		}
		const aiUpdatedBoard = updatedBoard.move(aiMove);
		setBoardLogic(aiUpdatedBoard);
		setBoard(aiUpdatedBoard.values);

		if (aiUpdatedBoard.isWin()) {
			setGameOver(true);
			let { ai } = scores;
			ai++;
			setScores({ ...scores, ai });

			return;
		}

		if (aiUpdatedBoard.isDraw()) {
			setGameOver(true);

			return;
		}
	};

	return (
		<div className="App">
			<ScoreBoard scores={scores} />
			<Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
			<ResetButton resetBoard={resetBoard} />
		</div>
	);
}
