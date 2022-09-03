/**
    * desc: Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.
     

    Example 1: =>
    Input: root = [3,9,20,null,null,15,7]
    Output: [3.00000,14.50000,11.00000]
    Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
    Hence return [3, 14.5, 11].
    
    Example 2: =>
    Input: root = [3,9,20,15,7]
    Output: [3.00000,14.50000,11.00000]
    
    Constraints: =>
    The number of nodes in the tree is in the range [1, 104].
    -231 <= Node.val <= 231 - 1
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

/**========================================== DFS ========================================================= */

/**
 *
 * @param root TreeNode | null
 * @returns number[]
 */
const averageOfLevelsDFS = (root: TreeNode | null): number[] => {
	const result: number[] = [];
	let levelNumbers: number[][] = [];

	// push number in each level to levelNumbers
	const dfs = (node: TreeNode | null, level: number) => {
		if (node === null) return;

		if (levelNumbers[level]) {
			levelNumbers[level].push(node.val);
		} else {
			levelNumbers[level] = [node.val];
		}

		dfs(node.left, level + 1);
		dfs(node.right, level + 1);
	};

	dfs(root, 0);

	// calculate average of each level
	for (let level of levelNumbers) {
		const sum: number = level.reduce((acc, currValue) => acc + currValue);
		result.push(sum / level.length);
	}

	return result;
};

/**========================================== BFS ========================================================= */

const averageOfLevelsBFS = (root: TreeNode | null): number[] => {
	const result: number[] = [];
	if (root === null) return result;

	let queue: TreeNode[] = [root];

	while (queue.length) {
		let sum: number = 0;
		let size: number = queue.length;

		for (let i = 0; i < size; i++) {
			let node: TreeNode = queue.shift() as TreeNode;
			sum += node!.val;

			if (node.left) queue.push(node.left);
			if (node.right) queue.push(node.right);
		}

		result.push(sum / size);
	}

	return result;
};
