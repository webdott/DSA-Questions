/**
    * desc: Given the root of a binary tree, return all duplicate subtrees.

    For each kind of duplicate subtrees, you only need to return the root node of any one of them.

    Two trees are duplicate if they have the same structure with the same node values.

    Example 1: =>
    Input: root = [1,2,3,4,null,2,4,null,null,4]
    Output: [[2,4],[4]]
    
    Example 2: =>
    Input: root = [2,1,1]
    Output: [[1]]
    
    Example 3: =>
    Input: root = [2,2,2,3,null,3,null]
    Output: [[2,3],[3]]
    
    Constraints: =>
    The number of the nodes in the tree will be in the range [1, 5000]
    -200 <= Node.val <= 200
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
 * @returns TreeNode[] | null
 */
const findDuplicateSubtrees = (root: TreeNode | null): TreeNode[] | null => {
	const seen: Map<string, { occ: number; node: TreeNode; added: boolean }> =
		new Map();
	const result: TreeNode[] | null = [];

	// check if node is leaf
	const isLeaf = (currNode: TreeNode): boolean => {
		return !Boolean(currNode.left || currNode.right);
	};

	// check if path has been seen before
	const checkPath = (currNode: TreeNode, path: string) => {
		if (seen.has(path)) {
			if (seen.get(path)!.added === false) {
				result.push(currNode);
				seen.get(path)!.added = true;
			}

			seen.get(path)!.occ += 1;
		} else {
			seen.set(path, { node: currNode, occ: 1, added: false });
		}
	};

	const dfs = (currNode: TreeNode) => {
		// if node is leaf, init path to the value and check path;
		if (isLeaf(currNode)) {
			let path = currNode.val.toString();
			checkPath(currNode, path);
			return path;
		} else {
			// get the currentPath of that node and check if seen before
			// if left or right node is null, init to '.'
			let path: string = currNode.val.toString() + '*';

			if (currNode.left) {
				path += dfs(currNode.left) + '*';
			} else {
				path += '.';
			}

			if (currNode.right) {
				path += dfs(currNode.right) + '*';
			} else {
				path += '.';
			}

			checkPath(currNode, path);

			return path;
		}
	};

	dfs(root!);

	return result;
};
