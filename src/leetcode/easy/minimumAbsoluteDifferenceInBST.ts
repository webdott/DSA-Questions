/**
    * desc: Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

    Example 1: =>
    Input: root = [4,2,6,1,3]
    Output: 1
    
    Example 2: =>
    Input: root = [1,0,48,null,null,12,49]
    Output: 1
    
    Constraints: =>
    The number of nodes in the tree is in the range [2, 104].
    0 <= Node.val <= 105
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
 * @param root TreeeNode | null
 * @returns number
 */
const getMinimumDifference = (root: TreeNode | null): number => {
	let numbers: number[] = [];
	let minDif: number = Infinity;

	const dfs = (node) => {
		if (node === null) return;

		numbers.push(node.val);

		dfs(node.left);
		dfs(node.right);
	};

	dfs(root);

	numbers.sort((a, b) => a - b);

	for (let i = 1; i < numbers.length; i++) {
		if (minDif > numbers[i] - numbers[i - 1])
			minDif = numbers[i] - numbers[i - 1];
	}

	return minDif;
};
