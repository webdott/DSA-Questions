/**
    * desc: Given the root of a binary tree, split the binary tree into two subtrees by removing one edge such that the product of the sums of the subtrees is maximized.

    Return the maximum product of the sums of the two subtrees. Since the answer may be too large, return it modulo 109 + 7.

    Note that you need to maximize the answer before taking the mod and not after taking it.

    Example 1: =>
    Input: root = [1,2,3,4,5,6]
    Output: 110
    Explanation: Remove the red edge and get 2 binary trees with sum 11 and 10. Their product is 110 (11*10)
    
    Example 2: =>
    Input: root = [1,null,2,3,4,null,null,5,6]
    Output: 90
    Explanation: Remove the red edge and get 2 binary trees with sum 15 and 6.Their product is 90 (15*6)

    Constraints: =>
    The number of nodes in the tree is in the range [2, 5 * 104].
    1 <= Node.val <= 104
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

/**
 *
 * @param root TreeNode
 * @returns number
 */
const maxProduct = (root: TreeNode): number => {
	let total: number = 0;
	let maxProd: number = 0;

	const dfs = (currNode: TreeNode) => {
		total += currNode.val;

		if (currNode.left) dfs(currNode.left);
		if (currNode.right) dfs(currNode.right);
	};

	dfs(root);

	const dfsMax = (currNode: TreeNode) => {
		let leftSum: number = 0;
		if (currNode.left) {
			leftSum = dfsMax(currNode.left);
			const prod: number = leftSum * (total - leftSum);
			maxProd = Math.max(maxProd, prod);
		}

		let rightSum: number = 0;
		if (currNode.right) {
			rightSum = dfsMax(currNode.right);
			const prod: number = rightSum * (total - rightSum);
			maxProd = Math.max(maxProd, prod);
		}

		return leftSum + rightSum + currNode.val;
	};

	dfsMax(root);

	return maxProd % (10 ** 9 + 7);
};
