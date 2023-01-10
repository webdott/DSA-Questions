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

const isSameTree = (p: TreeNode | null, q: TreeNode | null): boolean => {
	const dfs = (currNode: TreeNode | null): string => {
		if (currNode === null) {
			return 'null';
		} else {
			return currNode.val.toString() + dfs(currNode.left) + dfs(currNode.right);
		}
	};

	return dfs(p) === dfs(q);
};
