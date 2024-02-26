from typing import Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        queue = [[p, q]]

        while len(queue) > 0:
            curr_node = queue.pop(0)

            [curr_p, curr_q] = curr_node

            if curr_p or curr_q:
                if curr_p is None or curr_q is None or curr_p.val != curr_q.val:
                    return False

                queue.append([curr_p.left, curr_q.left])
                queue.append([curr_p.right, curr_q.right])

        return True
