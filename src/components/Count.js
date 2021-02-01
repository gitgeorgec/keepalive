import { useState } from "react";

function Count() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<div>{count}</div>
			<button onClick={() => setCount(count + 1)}>add</button>
		</div>
	)
}

export default Count
