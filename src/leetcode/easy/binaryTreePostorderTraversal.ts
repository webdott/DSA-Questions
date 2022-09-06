/**
	*desc: Given the root of a binary tree, return the postorder traversal of its nodes' values.

	Example 1: =>
	Input: root = [1,null,2,3]
	Output: [3,2,1]

	Example 2: =>
	Input: root = []
	Output: []

	Example 3: =>
	Input: root = [1]
	Output: [1]
	

	Constraints: =>
	The number of the nodes in the tree is in the range [0, 100].
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

const postorderTraversal = (root: TreeNode | null): number[] => {
	if (root === null) return [];

	const stack: TreeNode[] = [root];
	const memoryStack: number[] = [];

	while (stack.length) {
		const currentNode = stack.pop();

		if (currentNode!.left) stack.push(currentNode!.left);
		if (currentNode!.right) stack.push(currentNode!.right);
		memoryStack.push(currentNode!.val);
	}

	return memoryStack.reverse();
};
