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

/**
 * 
 * @param root TreeNode | null
 * @param k number
 * @returns number
 */
const kthSmallest = (root: TreeNode | null, k: number): number => {
	const smallestFigures: number[] = [];

	const dfs = (node: TreeNode | null) => {
		if (node === null) return;

		if (node.left === null && node.right === null) {
			smallestFigures.push(node.val);
			return;
		}

		dfs(node.left);
		smallestFigures.push(node.val);
		dfs(node.right);
	};

	dfs(root);

	return smallestFigures[k - 1];
}
