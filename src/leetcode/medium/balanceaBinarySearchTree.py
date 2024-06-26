# Given the root of a binary search tree, return a balanced binary search tree with the same node values. If there is more than one answer, return any of them.

# A binary search tree is balanced if the depth of the two subtrees of every node never differs by more than 1.

# Example 1: =>
# Input: root = [1,null,2,null,3,null,4,null,null]
# Output: [2,1,3,null,null,null,4]
# Explanation: This is not the only correct answer, [3,1,4,null,2] is also correct.

# Example 2: =>
# Input: root = [2,1,3]
# Output: [2,1,3]

# Constraints: =>
# The number of nodes in the tree is in the range [1, 104].
# 1 <= Node.val <= 105

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isLeaf(self, root: TreeNode) -> bool:
        return root.left is root.right

    def rebuildBST(self, node_vals: list[int]) -> TreeNode:
        n = len(node_vals)

        if n == 0:
            return None

        left, right = 0, n - 1

        mid_idx = (left + right) // 2
        mid = node_vals[mid_idx]

        new_root = TreeNode(mid)

        new_root.left = self.rebuildBST(node_vals[0:mid_idx])
        new_root.right = self.rebuildBST(node_vals[mid_idx + 1 : n])

        return new_root

    def getSortedNumbers(self, root: TreeNode) -> list[int]:
        if self.isLeaf(root):
            return [root.val]

        if root.left:
            left_vals = self.getSortedNumbers(root.left)
        else:
            left_vals = []

        if root.right:
            right_vals = self.getSortedNumbers(root.right)
        else:
            right_vals = []

        return left_vals + [root.val] + right_vals

    def balanceBST(self, root: TreeNode) -> TreeNode:
        sorted_nums = self.getSortedNumbers(root)

        return self.rebuildBST(sorted_nums)
