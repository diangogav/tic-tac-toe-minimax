import "./ResetButton.css";

import React from "react";

export const ResetButton = ({ resetBoard }: { resetBoard: () => void }) => {
	return (
		<button className="reset-btn" onClick={resetBoard}>
			Reset
		</button>
	);
};
