# Given the head of a linked list, remove the nth node from the end of the list and return its head.

# Example 1: =>
# Input: head = [1,2,3,4,5], n = 2
# Output: [1,2,3,5]

# Example 2: =>
# Input: head = [1], n = 1
# Output: []

# Example 3: =>
# Input: head = [1,2], n = 1
# Output: [1]

# Constraints: =>
# The number of nodes in the list is sz.
# 1 <= sz <= 30
# 0 <= Node.val <= 100
# 1 <= n <= sz

# Follow up: Could you do this in one pass?

from typing import Optional


# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        #  two passes
        curr_node = head

        length = 0
        while curr_node:
            length += 1
            curr_node = curr_node.next

        dummy_node = ListNode(-1)
        dummy_node.next = head
        curr_node = dummy_node

        while curr_node:
            length -= 1

            if length == n - 1:
                curr_node.next = curr_node.next.next
                return dummy_node.next

            curr_node = curr_node.next

        return dummy_node.next
