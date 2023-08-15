/**
    * desc: Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

    You should preserve the original relative order of the nodes in each of the two partitions.

    Example 1: =>
    Input: head = [1,4,3,2,5,2], x = 3
    Output: [1,2,2,4,3,5]
    
    Example 2: =>
    Input: head = [2,1], x = 2
    Output: [1,2]

    Constraints: =>
    The number of nodes in the list is in the range [0, 200].
    -100 <= Node.val <= 100
    -200 <= x <= 200

    * Definition for singly-linked list is below.
 */
class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}

const partition = (head: ListNode | null, x: number): ListNode | null => {
	let currPointer: ListNode | null = new ListNode(-201);
	currPointer.next = head;
	let firstIteratorNode: ListNode | null = currPointer;
	let lastIteratorNode: ListNode | null = currPointer.next;

	while (lastIteratorNode) {
		if ((firstIteratorNode?.next?.val ?? Infinity) < x) {
			firstIteratorNode = firstIteratorNode!.next;
		}

		if (
			(lastIteratorNode?.next?.val ?? Infinity) < x &&
			(lastIteratorNode?.next?.val ?? Infinity) <
				(firstIteratorNode?.next?.val ?? 0)
		) {
			let temp = lastIteratorNode.next;
			lastIteratorNode.next = lastIteratorNode.next!.next;
			temp!.next = firstIteratorNode!.next;
			firstIteratorNode!.next = temp;
			continue;
		}

		lastIteratorNode = lastIteratorNode.next;
	}

	return currPointer.next;
};
