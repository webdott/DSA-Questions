# Given the root of a binary tree, return the leftmost value in the last row of the tree.

# Example 1: =>
# Input: root = [2,1,3]
# Output: 1

# Example 2: =>
# Input: root = [1,2,3,4,null,5,6,null,null,7]
# Output: 7

# Constraints: =>
# The number of nodes in the tree is in the range [1, 104].
# -231 <= Node.val <= 231 - 1

from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        leftmost = -1

        queue = [root]

        while queue:
            size = len(queue)

            for i in range(size):
                curr_node = queue.pop(0)

                if i == 0:
                    leftmost = curr_node.val

                if curr_node.left:
                    queue.append(curr_node.left)

                if curr_node.right:
                    queue.append(curr_node.right)

        return leftmost
