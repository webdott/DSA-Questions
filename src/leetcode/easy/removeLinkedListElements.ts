/**
    * desc: Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.

    Example 1: =>
    Input: head = [1,2,6,3,4,5,6], val = 6
    Output: [1,2,3,4,5]
    Example 2:

    Input: head = [], val = 1
    Output: []
    
    Example 3: =>
    Input: head = [7,7,7,7], val = 7
    Output: []

    Constraints: =>
    The number of nodes in the list is in the range [0, 104].
    1 <= Node.val <= 50
    0 <= val <= 50
 */

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}

/**
 *
 * @param head ListNode | null
 * @param val number
 * @returns ListNode | null
 */
const removeElements = (
	head: ListNode | null,
	val: number
): ListNode | null => {
	if (head === null) return head;

	let node = head;

	while (node.next !== null) {
		if (node.next?.val === val) {
			const temp = node.next.next;
			node.next.next = null;
			node.next = temp;
		} else {
			node = node.next;
		}
	}

	if (head.val === val) {
		head = head.next;
	}

	return head;
};