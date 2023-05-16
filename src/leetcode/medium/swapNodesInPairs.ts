/**
    * desc: Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

    Example 1: =>
    Input: head = [1,2,3,4]
    Output: [2,1,4,3]
    
    Example 2: =>
    Input: head = []
    Output: []
    
    Example 3: =>
    Input: head = [1]
    Output: [1]
    
    Constraints: =>
    The number of nodes in the list is in the range [0, 100].
    0 <= Node.val <= 100
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
 * @returns ListNode | null
 */
const swapPairs = (head: ListNode | null): ListNode | null => {
	if (head === null || head.next === null) return head;

	let startNode: ListNode = head;
	let endNode: ListNode = head.next;
	let switchCount: number = 0;

	while (endNode !== null) {
		if (switchCount % 2 === 0) {
			let temp: number = startNode.val;
			startNode.val = endNode.val;
			endNode.val = temp;
		}

		switchCount += 1;
		startNode = startNode.next!;
		endNode = endNode.next!;
	}

	return head;
};
