/**
    * desc: Given the head of a linked list, remove the nth node from the end of the list and return its head.

    Example 1: =>
    Input: head = [1,2,3,4,5], n = 2
    Output: [1,2,3,5]
    
    Example 2: =>
    Input: head = [1], n = 1
    Output: []
    
    Example 3: =>
    Input: head = [1,2], n = 1
    Output: [1]
    
    Constraints: =>
    The number of nodes in the list is sz.
    1 <= sz <= 30
    0 <= Node.val <= 100
    1 <= n <= sz
    
    Follow up: Could you do this in one pass?
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

const removeNthFromEnd = (
	head: ListNode | null,
	n: number
): ListNode | null => {
	let iterator: ListNode | null = head;
	let length: number = 0;

	while (iterator !== null) {
		length += 1;
		iterator = iterator.next;
	}

	iterator = head;

	let index: number = 0;

	while (iterator !== null) {
		if (length - n === 0) {
			return iterator.next;
		}

		index += 1;

		if (length - n === index) {
			iterator.next = iterator.next!.next;

			return head;
		}

		iterator = iterator.next;
	}

	return null;
};

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

const removeNthFromEndTwoPointer = (
	head: ListNode | null,
	n: number
): ListNode | null => {
	let fast: ListNode | null = head;
	let slow: ListNode | null = head;

	for (let i = 0; i < n; i++) {
		if (fast!.next === null) return head!.next;

		fast = fast!.next;
	}

	while (fast!.next !== null) {
		fast = fast!.next;
		slow = slow!.next;
	}

	slow!.next = slow!.next!.next;

	return head;
};
