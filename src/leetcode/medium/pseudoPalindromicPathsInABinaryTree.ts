/**
    * desc: Given a binary tree where node values are digits from 1 to 9. A path in the binary tree is said to be pseudo-palindromic if at least one permutation of the node values in the path is a palindrome.

    Return the number of pseudo-palindromic paths going from the root node to leaf nodes.

    Example 1: =>
    Input: root = [2,3,1,3,1,null,1]
    Output: 2 
    Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the red path [2,3,3], the green path [2,1,1], and the path [2,3,1]. Among these paths only red path and green path are pseudo-palindromic paths since the red path [2,3,3] can be rearranged in [3,2,3] (palindrome) and the green path [2,1,1] can be rearranged in [1,2,1] (palindrome).
    
    Example 2: =>
    Input: root = [2,1,1,1,3,null,null,null,null,null,1]
    Output: 1 
    Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the green path [2,1,1], the path [2,1,3,1], and the path [2,1]. Among these paths only the green path is pseudo-palindromic since [2,1,1] can be rearranged in [1,2,1] (palindrome).
    
    Example 3: =>
    Input: root = [9]
    Output: 1
    
    Constraints: =>
    The number of nodes in the tree is in the range [1, 105].
    1 <= Node.val <= 9
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

const pseudoPalindromicPaths = (root: TreeNode | null): number => {
	if (root === null) return 0;
	let result: number = 0;

    // initialize a new set and get paths of the tree, when at the end of a path, check if the set has 0 or 1 element. If so, increment the result since it's a pseudo-palindromic path
	const dfs = (node: TreeNode, set: Set<number>) => {
		if (set.has(node.val)) {
			set.delete(node.val);
		} else {
			set.add(node.val);
		}

		if (node.left === null && node.right === null) {
			if (set.size < 2) result += 1;
		} else if (node.left === null) {
			dfs(node.right!, new Set(set));
		} else if (node.right === null) {
			dfs(node.left, new Set(set));
		} else {
			dfs(node.left, new Set(set));
			dfs(node.right, new Set(set));
		}
	};

	dfs(root, new Set());

	return result;
};
