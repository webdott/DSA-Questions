/**
    * desc: Given the root of a binary tree, return its maximum depth.

    A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

    Example 1: =>
    Input: root = [3,9,20,null,null,15,7]
    Output: 3

    Example 2: =>
    Input: root = [1,null,2]
    Output: 2
    
    Constraints: =>
    The number of nodes in the tree is in the range [0, 104].
    -100 <= Node.val <= 100
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
 * @returns number
 */
const maxDepth = (root: TreeNode | null): number => {
	const dfs = (currNode: TreeNode | null) => {
		if (currNode === null) return 0;

		return 1 + Math.max(dfs(currNode.left), dfs(currNode.right));
	};

	return dfs(root);
};
