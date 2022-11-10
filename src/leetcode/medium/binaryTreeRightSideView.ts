/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}

const rightSideView = (root: TreeNode | null): number[] => {
	const result: number[] = [];
	const seen: Set<number> = new Set();

	const dfs = (node: TreeNode | null, level: number): void => {
		if (node === null) return;

		if (!seen.has(level)) result.push(node.val);
		seen.add(level);

		dfs(node.right, level + 1);
		dfs(node.left, level + 1);
	};

	dfs(root, 1);

	return result;
};

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

const rightSideViewBFS = (root: TreeNode | null): number[] => {
	if (root === null) return [];

	const result: number[] = [];
	const queue: TreeNode[] = [];

	queue.push(root);

	while (queue.length > 0) {
		let queueSize: number = queue.length;
		let pushed = false;

		for (let i = 0; i < queueSize; i++) {
			let currElement = queue.shift()!;

			if (!pushed) {
				result.push(currElement.val);
				pushed = true;
			}

			if (currElement.right) queue.push(currElement.right);
			if (currElement.left) queue.push(currElement.left);
		}
	}

	return result;
};
