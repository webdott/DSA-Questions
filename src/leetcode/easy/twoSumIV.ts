/**
    * desc: Given the root of a Binary Search Tree and a target number k, return true if there exist two elements in the BST such that their sum is equal to the given target.

    Example 1: =>
    Input: root = [5,3,6,2,4,null,7], k = 9
    Output: true
    
    Example 2: =>
    Input: root = [5,3,6,2,4,null,7], k = 28
    Output: false

    Constraints: =>
    The number of nodes in the tree is in the range [1, 104].
    -104 <= Node.val <= 104
    root is guaranteed to be a valid binary search tree.
    -105 <= k <= 105
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
 * @param k number
 * @returns boolean
 */
const findTarget = (root: TreeNode | null, k: number): boolean => {
	const hashTable: Set<number> = new Set();

	const dfs = (node: TreeNode | null, target: number) => {
		if (node === null) return false;
		if (hashTable.has(target - node.val)) return true;

		hashTable.add(node.val);

		return dfs(node.left, target) || dfs(node.right, target);
	};

	return dfs(root, k);
};
