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
 * @param node TreeNode | null
 * @returns number
 */
const countLeft = (node: TreeNode | null): number => {
	let leftCount: number = 0;
	let curr = node;

	while (curr !== null) {
		leftCount += 1;
		curr = curr.left;
	}

	return leftCount;
};

/**
 * 
 * @param node TreeNode | null
 * @returns number
 */
const countRight = (node: TreeNode | null): number => {
	let rightCount: number = 0;
	let curr = node;

	while (curr !== null) {
		rightCount += 1;
		curr = curr.right;
	}

	return rightCount;
};

/**
 * 
 * @param root TreeNode | null
 * @returns number
 */
const countNodes = (root: TreeNode | null): number => {
	const countNodesHelper = (node: TreeNode | null): number => {
		if (node === null) return 0;

		let leftCount: number = countLeft(node.left);
		let rightCount: number = countRight(node.right);

		if (leftCount === rightCount) return 2 ** (leftCount + 1) - 1;

		return 1 + countNodesHelper(node.left) + countNodesHelper(node.right);
	};

	return countNodesHelper(root);
}
