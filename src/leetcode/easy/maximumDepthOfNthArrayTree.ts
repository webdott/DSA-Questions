/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     children: Node[]
 *     constructor(val?: number, children?: Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = (children===undefined ? [] : children)
 *     }
 * }
 */

class NodeA {
	val: number;
	children: NodeA[];
	constructor(val?: number, children?: NodeA[]) {
		this.val = val === undefined ? 0 : val;
		this.children = children === undefined ? [] : children;
	}
}

const maxDepth = (root: NodeA | null): number => {
	if (root === null) return 0;

	let max: number = 0;

	const dfs = (node: NodeA, depth: number) => {
		if (node.children.length === 0) {
			max = Math.max(depth + 1, max);
			return;
		}

		for (let child of node.children) {
			dfs(child, depth + 1);
		}
	};

	dfs(root, 0);

	return max;
};
