/**
    * desc: Given the root of a binary tree, return the inorder traversal of its nodes' values.

    Example 1: =>
    Input: root = [1,null,2,3]
    Output: [1,3,2]

    Example 2: =>
    Input: root = []
    Output: []

    Example 3: =>
    Input: root = [1]
    Output: [1]
    

    Constraints: =>
    The number of nodes in the tree is in the range [0, 100].
    -100 <= Node.val <= 100

    Follow up: Recursive solution is trivial, could you do it iteratively?
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
 * @returns number[]
 */
const inorderTraversal = (root: TreeNode | null): number[] => {
	const result: number[] = [];

	const dfs = (node: TreeNode | null) => {
		if (node === null) return;

		dfs(node.left);
		result.push(node.val);
		dfs(node.right);
	};

	dfs(root);

	return result;
};
