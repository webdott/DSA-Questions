/**
    * desc: Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a leaf value sequence.

    For example, in the given tree above, the leaf value sequence is (6, 7, 4, 9, 8).

    Two binary trees are considered leaf-similar if their leaf value sequence is the same.

    Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.

    Example 1: =>
    Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
    Output: true
    
    Example 2: =>
    Input: root1 = [1,2,3], root2 = [1,3,2]
    Output: false
    
    Constraints: =>
    The number of nodes in each tree will be in the range [1, 200].
    Both of the given trees will have values in the range [0, 200].
 */

/**
 * Definition for a binary tree node.
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

const leafSimilar = (root1: TreeNode, root2: TreeNode): boolean => {
	const leaf1: number[] = [];
	const leaf2: number[] = [];

	const dfs = (currNode: TreeNode, leaf: number) => {
		if (currNode.left === null && currNode.right === null) {
			if (leaf === 1) {
				leaf1.push(currNode.val);
			} else {
				leaf2.push(currNode.val);
			}
		}

		if (currNode.left) dfs(currNode.left, leaf);
		if (currNode.right) dfs(currNode.right, leaf);
	};

	dfs(root1, 1);
	dfs(root2, 2);

	return leaf1.join('-') === leaf2.join('-');
};
