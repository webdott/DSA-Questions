/*
    desc: Given the head of a singly linked list, return true if it is a palindrome.

    Example 1:
    Input: head = [1,2,2,1]
    Output: true

    Example 2: =>
    Input: head = [1,2]
    Output: false
    
    Constraints: =>
    The number of nodes in the list is in the range [1, 105].
    0 <= Node.val <= 9
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

type ListNode = {
	val: number;
	next: ListNode | null;
};

const isPalindrome = (head: ListNode | null): boolean => {
	if (head === null || head.next === null) return true;
	let h = head;
	const arr = [];
	let left = 0;

	while (h !== null) {
		arr.push(h.val);
		h = h.next;
	}

	let stop = Math.floor(arr.length / 2);

	for (let i = arr.length - 1; i >= stop; i--) {
		if (arr[i] === arr[left]) {
			left += 1;
		} else {
			return false;
		}
	}

	return true;
};
