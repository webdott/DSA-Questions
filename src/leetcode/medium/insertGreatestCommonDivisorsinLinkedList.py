# Given the head of a linked list head, in which each node contains an integer value.

# Between every pair of adjacent nodes, insert a new node with a value equal to the greatest common divisor of them.

# Return the linked list after insertion.

# The greatest common divisor of two numbers is the largest positive integer that evenly divides both numbers.

# Example 1: =>
# Input: head = [18,6,10,3]
# Output: [18,6,6,2,10,1,3]
# Explanation: The 1st diagram denotes the initial linked list and the 2nd diagram denotes the linked list after inserting the new nodes (nodes in blue are the inserted nodes).
# - We insert the greatest common divisor of 18 and 6 = 6 between the 1st and the 2nd nodes.
# - We insert the greatest common divisor of 6 and 10 = 2 between the 2nd and the 3rd nodes.
# - We insert the greatest common divisor of 10 and 3 = 1 between the 3rd and the 4th nodes.
# There are no more adjacent nodes, so we return the linked list.

# Example 2: =>
# Input: head = [7]
# Output: [7]
# Explanation: The 1st diagram denotes the initial linked list and the 2nd diagram denotes the linked list after inserting the new nodes.
# There are no pairs of adjacent nodes, so we return the initial linked list.
 
# Constraints: =>
# The number of nodes in the list is in the range [1, 5000].
# 1 <= Node.val <= 1000

# Definition for singly-linked list.
from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
        
class Solution:
    def greatestCommonDivisor(self, n1: int, n2: int) -> int:
        if n1 == 1 or n2 == 1:
            return 1

        min_divisor = min(n1, n2)

        for i in range(min_divisor, 0, -1):
            if i == 1:
                return i * self.greatestCommonDivisor(1, 1)

            if n1 % i == 0 and n2 % i == 0:
                return i * self.greatestCommonDivisor(int(n1 / i), int(n2 / i))


    def insertGreatestCommonDivisors(self, head: Optional[ListNode]) -> Optional[ListNode]:
        current = head

        while current:
            next_node = current.next

            if next_node:
                new_node = ListNode(self.greatestCommonDivisor(current.val, next_node.val))
                new_node.next = current.next
                current.next = new_node
                current = current.next

            current = current.next

        return head