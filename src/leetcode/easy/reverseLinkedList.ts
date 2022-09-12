/**
    * desc: Given the head of a singly linked list, reverse the list, and return the reversed list.

    Example 1: =>
    Input: head = [1,2,3,4,5]
    Output: [5,4,3,2,1]
    
    Example 2: =>
    Input: head = [1,2]
    Output: [2,1]
    
    Example 3: =>
    Input: head = []
    Output: []
    
    Constraints: =>
    The number of nodes in the list is the range [0, 5000].
    -5000 <= Node.val <= 5000
    
    Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
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

// time complexity -> O(n);
// Space complexity -> O(n);

/**
 *
 * @param head ListNode | null
 * @returns ListNode | null
 */
const reverseList = (head: ListNode | null): ListNode | null => {
	if (head === null) return null;

	let reversedNode: ListNode = new ListNode(head.val);
	let iterator: ListNode | null = head.next;

	while (iterator !== null) {
		// make that node the head, make this node.next be the head of the reversedNode
		let currentNode: ListNode = new ListNode(iterator.val);
		// Node(5) -> Node(4) -> Node(3) -> Node(2) -> Node(1);
		currentNode.next = reversedNode;
		reversedNode = currentNode;

		// moving to the next node
		iterator = iterator.next;
	}

	return reversedNode;
};
