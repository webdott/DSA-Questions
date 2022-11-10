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

class BSTIterator {
	private root: TreeNode;
	private elements: number[];
	private pointer: number;

	constructor(root: TreeNode | null) {
		this.root = root!;
		this.elements = [];
		this.pointer = -1;

		const inOrder = (node: TreeNode | null) => {
			if (node === null) return;

			inOrder(node.left);
			this.elements.push(node.val);
			inOrder(node.right);
		};

		inOrder(root);
	}

	// Time -> 0(1) | Space -> 0(h)
	next(): number {
		this.pointer += 1;
		return this.elements[this.pointer];
	}

	// Time -> 0(1) | Space -> 0(h)
	hasNext(): boolean {
		return this.pointer < this.elements.length - 1;
	}
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
