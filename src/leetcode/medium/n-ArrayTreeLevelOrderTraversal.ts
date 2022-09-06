/**
 * desc: 
 */

/**
 * Definition for node.
 * class Node {
 *     val: number
 *     children: Node[]
 *     constructor(val?: number) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = []
 *     }
 * }
 */

class NodeType {
	val: number;
	children: NodeType[];
	constructor(val?: number) {
		this.val = val === undefined ? 0 : val;
		this.children = [];
	}
}

/**================================================ DFS ================================================ */
/**
 *
 * @param root NodeType | null
 * @returns number[][]
 */
const levelOrderDFS = (root: NodeType | null): number[][] => {
	const result: number[][] = [];
	if (root === null) return result;

	const dfs = (level: number, nodeChildren: NodeType[] | null) => {
		if (nodeChildren === null || !nodeChildren.length) return;

		for (let node of nodeChildren) {
			if (result[level]) {
				result[level].push(node.val);
			} else {
				result[level] = [node.val];
			}
			dfs(level + 1, node.children);
		}
	};

	dfs(0, [root]);

	return result;
};

/**================================================ BFS ================================================ */
/**
 *
 * @param root NodeType | null
 * @returns number[][]
 */
const levelOrderBFS = (root: NodeType | null): number[][] => {
	const result: number[][] = [];
	if (root === null) return result;

	const queue: NodeType[] = [root];

	while (queue.length) {
		let queueSize = queue.length;
		let levelNumbers: number[] = [];

		for (let i = 0; i < queueSize; i++) {
			let node = queue.shift();
			levelNumbers.push(node!.val);

			queue.push(...node!.children);
		}

		result.push(levelNumbers);
	}

	return result;
};
