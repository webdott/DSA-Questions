/**
 * Definition for Node.
 */
class GraphNode {
	val: number;
	neighbors: GraphNode[];
	constructor(val?: number, neighbors?: GraphNode[]) {
		this.val = val === undefined ? 0 : val;
		this.neighbors = neighbors === undefined ? [] : neighbors;
	}
}

const cloneGraph = (node: GraphNode | null): GraphNode | null => {
	if (node === null) return null;

	const visited: Map<GraphNode, GraphNode> = new Map();

	const dfs = (node: GraphNode): GraphNode => {
		if (visited.has(node)) return visited.get(node)!;

		const tempNode = new GraphNode(node.val);
		visited.set(node, tempNode);

		for (let i = 0; i < node.neighbors.length; i++) {
			tempNode.neighbors[i] = dfs(node.neighbors[i]);
		}

		return tempNode;
	};

	const deepNode = dfs(node);

	return deepNode;
};
