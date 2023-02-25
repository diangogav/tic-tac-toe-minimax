/* eslint-disable @typescript-eslint/restrict-template-expressions */
import "./ScoreBoard.css";

import React from "react";

export const ScoreBoard = ({ scores }: { scores: { player: number; ai: number } }) => {
	const { player, ai } = scores;

	return (
		<div className="scoreboard">
			<span className={`score o-score`}>Player - {player}</span>
			<span className={`score x-score`}>AI - {ai}</span>
		</div>
	);
};
