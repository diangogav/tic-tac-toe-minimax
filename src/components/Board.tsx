import "./Board.css";

import { Box } from "./Box";

export const Board = ({
	board,
	onClick,
}: {
	board: string[];
	onClick: (index: number) => void;
}) => {
	return (
		<div className="board">
			{board.map((cell, index) => {
				// eslint-disable-next-line no-console
				return <Box value={cell} key={index} onClick={() => cell === "" && onClick(index)} />;
			})}
		</div>
	);
};
