import React, { createRef, useEffect, useRef, useState } from 'react';

const AliveContext = React.createContext({});

export const AliveScope = props => {
	const [state, setState] = useState({});
	const nodes = createRef({});
	nodes.current = {}

	function keep(id, children) {
		setState({
			...state,
			[id]: { id, children }
		})
	}

	return (
		<AliveContext.Provider value={{ keep, nodes }}>
			{props.children}
			{Object.values(state).map(({ id, children }) => {
				return (
					<div key={id} ref={ref => nodes.current[id] = ref}>
						{children}
					</div>
				)
			})}
		</AliveContext.Provider>
	);
}

const withScope = WrappedCompoennt => props => (
	<AliveContext.Consumer>
		{({keep, nodes}) => <WrappedCompoennt {...props} keep={keep} nodes={nodes}/>}
	</AliveContext.Consumer>
)

function KeepAlive({ id, children, keep, nodes }) {
	const NodeRef = useRef(null);

	useEffect(() => {
		keep(id, children);
	}, [])

	useEffect(() => {
		if (nodes.current && nodes.current[id]) {
			NodeRef.current.appendChild(nodes.current[id])
		}
	}, [nodes, id])

	return (
		<div ref={NodeRef}>
		</div>
	)
}

export default withScope(KeepAlive)
