/**
    * desc: Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.

    Example 1: =>
    Input: head = [1,2,3,4,5], left = 2, right = 4
    Output: [1,4,3,2,5]
    
    Example 2: =>
    Input: head = [5], left = 1, right = 1
    Output: [5]
    
    Constraints: =>
    The number of nodes in the list is n.
    1 <= n <= 500
    -500 <= Node.val <= 500
    1 <= left <= right <= n
    
    Follow up: Could you do it in one pass?
 */

/**
 * Definition for singly-linked list.
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
 * @param left number
 * @param right number
 * @returns ListNode | null
 */
const reverseBetweenStack = (
	head: ListNode | null,
	left: number,
	right: number
): ListNode | null => {
	// if left = right or no head, there is nothing to reverse
	if (head === null || left === right) return head;

	let currNode: ListNode | null = head;
	const stack: number[] = [];
	let idx: number = 0;

	while (currNode !== null && idx < right) {
		idx += 1;

		if (idx >= left && idx <= right) stack.push(currNode.val);

		currNode = currNode.next;
	}

	currNode = head;
	idx = 0;

	while (currNode !== null && idx < right) {
		idx += 1;

		if (idx >= left && idx <= right) {
			currNode.val = stack.pop()!;
		}

		currNode = currNode.next;
	}

	return head;
};

/**
 *
 * @param head ListNode | null
 * @param left number
 * @param right number
 * @returns ListNode | null
 */
const reverseBetween = (
	head: ListNode | null,
	left: number,
	right: number
): ListNode | null => {
	// if left = right or no head, there is nothing to reverse
	if (head === null || left === right) return head;

	let reversedNode: ListNode = new ListNode(-1);
	reversedNode.next = head;
	let prev: ListNode = reversedNode;

	for (let i = 0; i < left - 1; i++) {
		prev = prev.next!;
	}

	let current = prev.next;

	for (let i = left; i < right; i++) {
		const nextNode = current!.next;
		current!.next = nextNode!.next;
		nextNode!.next = prev.next;
		prev.next = nextNode;
	}

	return reversedNode.next;
};
