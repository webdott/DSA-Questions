/**
    * desc: Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

    Example 1: =>
    Input: root = [3,9,20,null,null,15,7]
    Output: [[3],[20,9],[15,7]]

    Example 2: =>
    Input: root = [1]
    Output: [[1]]
    
    Example 3: =>
    Input: root = []
    Output: []
    
    Constraints: =>
    The number of nodes in the tree is in the range [0, 2000].
    -100 <= Node.val <= 100
 */

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
 * @returns number[][]
 */
const zigzagLevelOrder = (root: TreeNode | null): number[][] => {
	if (root === null) return [];

	const result: number[][] = [];

	const queue: TreeNode[] = [root];
	let dir: number = 0;

	while (queue.length > 0) {
		const currLevel: number[] = [];
		const queueLength: number = queue.length;

		for (let i = 0; i < queueLength; i++) {
			const currentNode = queue.shift()!;
			currLevel.push(currentNode.val);
			if (currentNode.left) queue.push(currentNode.left);
			if (currentNode.right) queue.push(currentNode.right);
		}

		if (dir === 1) currLevel.reverse();

		dir = dir === 0 ? 1 : 0;
		result.push(currLevel);
	}

	return result;
};
