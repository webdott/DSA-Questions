/**
    * desc: Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
     
    Example 1: =>
    Input: root = [1,2,2,3,4,4,3]
    Output: true

    Example 2:  =>
    Input: root = [1,2,2,null,3,null,3]
    Output: false
    
    Constraints: =>
    The number of nodes in the tree is in the range [1, 1000].
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
 * @param queue (number | null)[]
 * @returns boolean
 */
const checkSymmetry = (queue: (number | null)[]): boolean => {
	let left: number = 0;
	let right: number = queue.length - 1;

	while (left <= right) {
		if (queue[left] !== queue[right]) return false;

		left += 1;
		right -= 1;
	}

	return true;
};

/**
 *
 * @param root TreeNode
 * @returns boolean
 */
const isSymmetric = (root: TreeNode): boolean => {
	const queue: (TreeNode | null)[] = [root];

	while (queue.length > 0) {
		const length = queue.length;
		const innerQueue: (number | null)[] = [];

		for (let i = 0; i < length; i++) {
			const currNode = queue.shift();
			innerQueue.push(currNode?.val ?? null);
			if (currNode !== null) {
				queue.push(currNode?.left ?? null);
				queue.push(currNode?.right ?? null);
			}
		}

		if (!checkSymmetry(innerQueue)) return false;
	}

	return true;
};
