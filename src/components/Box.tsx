import "./Box.css";

export const Box = ({ value, onClick }: { value: string; onClick: () => void }) => {
	const style = value === "X" ? "box x" : "box o";

	return (
		<button className={style} onClick={onClick}>
			{value}
		</button>
	);
};
