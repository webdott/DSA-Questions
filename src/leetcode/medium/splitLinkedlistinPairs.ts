/**
    * desc: Given the head of a singly linked list and an integer k, split the linked list into k consecutive linked list parts.

    The length of each part should be as equal as possible: no two parts should have a size differing by more than one. This may lead to some parts being null.

    The parts should be in the order of occurrence in the input list, and parts occurring earlier should always have a size greater than or equal to parts occurring later.

    Return an array of the k parts.

    Example 1: =>
    Input: head = [1,2,3], k = 5
    Output: [[1],[2],[3],[],[]]
    Explanation:
    The first element output[0] has output[0].val = 1, output[0].next = null.
    The last element output[4] is null, but its string representation as a ListNode is [].
    
    Example 2: =>
    Input: head = [1,2,3,4,5,6,7,8,9,10], k = 3
    Output: [[1,2,3,4],[5,6,7],[8,9,10]]
    Explanation:
    The input has been split into consecutive parts with size difference at most 1, and earlier parts are a larger size than the later parts.

    Constraints: =>
    The number of nodes in the list is in the range [0, 1000].
    0 <= Node.val <= 1000
    1 <= k <= 50
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
 * @param k  number
 * @returns Array<ListNode | null>
 */
const splitListToParts = (
	head: ListNode | null,
	k: number
): Array<ListNode | null> => {
	let totalNodeCount: number = 0;
	const result: Array<ListNode | null> = Array(k).fill(null);

	let currNode: ListNode | null = head;

	// get total Node count in list
	while (currNode !== null) {
		totalNodeCount += 1;

		currNode = currNode.next;
	}

	// number of node tp share for each part
	const nodeEach: number = Math.floor(totalNodeCount / k);
	// remainder to share from left to right
	let nodeLeftToShare: number = totalNodeCount % k;

	let partIdx: number = 0;

	currNode = head;

	// start from first part to the end
	while (partIdx < k && currNode !== null) {
		let pointToStop: number = nodeEach + (nodeLeftToShare > 0 ? 1 : 0);
		if (nodeLeftToShare > 0) nodeLeftToShare -= 1;

		// initialize a part headNode and keep appending to it until we get to a share limit
		const headOfPart: ListNode = new ListNode(-1);
		let currPartNode: ListNode = headOfPart;

		for (let i = 0; i < pointToStop; i++) {
			if (currNode === null) break;

			currPartNode.next = currNode;
			currNode = currNode.next;
			currPartNode = currPartNode.next;
		}

		// break of part linked list and assign to result
		if (currPartNode) currPartNode.next = null;
		if (headOfPart.next) result[partIdx] = headOfPart.next;

		partIdx += 1;
	}

	return result;
};
