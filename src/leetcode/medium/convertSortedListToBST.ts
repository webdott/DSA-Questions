/**
    * desc: Given the head of a singly linked list where elements are sorted in ascending order, convert it to a height-balanced binary search tree.

    Example 1: =>
    Input: head = [-10,-3,0,5,9]
    Output: [0,-3,9,-10,null,5]
    Explanation: One possible answer is [0,-3,9,-10,null,5], which represents the shown height balanced BST.
    
    Example 2: =>
    Input: head = []
    Output: []
    
    Constraints: =>
    The number of nodes in head is in the range [0, 2 * 104].
    -105 <= Node.val <= 105
 */

class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}

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
 * @param head ListNode | null
 * @param tail ListNode | null
 * @returns TreeNode | null
 */
const toBST = (
	head: ListNode | null,
	tail: ListNode | null
): TreeNode | null => {
	let slow = head;
	let fast = head;

	if (head === tail) return null;

	while (fast !== tail && fast!.next !== tail) {
		slow = slow!.next;
		fast = fast!.next!.next;
	}

	const currHead = new TreeNode(slow!.val);
	currHead.left = toBST(head, slow);
	currHead.right = toBST(slow!.next, tail);

	return currHead;
};

const sortedListToBST = (head: ListNode | null): TreeNode | null => {
	return head === null ? null : toBST(head, null);
};
