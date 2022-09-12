/**
    * desc: Given the head of a singly linked list, return the middle node of the linked list.

    If there are two middle nodes, return the second middle node.

    Example 1: =>
    Input: head = [1,2,3,4,5]
    Output: [3,4,5]
    Explanation: The middle node of the list is node 3.
    
    Example 2: =>
    Input: head = [1,2,3,4,5,6]
    Output: [4,5,6]
    Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.

    Constraints: =>
    The number of nodes in the list is in the range [1, 100].
    1 <= Node.val <= 100
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

const middleNode = (head: ListNode | null): ListNode | null => {
	if (head === null) return null;
	const hashTable: Map<number, ListNode> = new Map();
	let curr: ListNode | null = head;

	let count: number = -1;

	while (curr !== null) {
		count += 1;
		hashTable.set(count, curr);
		curr = curr.next;
	}

	let mid = Math.floor((count + 1) / 2);
	return hashTable.get(mid) as ListNode;
};
