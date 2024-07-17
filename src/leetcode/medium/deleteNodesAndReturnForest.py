# Given the root of a binary tree, each node in the tree has a distinct value.

# After deleting all nodes with a value in to_delete, we are left with a forest (a disjoint union of trees).

# Return the roots of the trees in the remaining forest. You may return the result in any order.

# Example 1: =>
# Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
# Output: [[1,2,null,4],[6],[7]]

# Example 2: =>
# Input: root = [1,2,4,null,3], to_delete = [3]
# Output: [[1,2,4]]

# Constraints: =>
# The number of nodes in the given tree is at most 1000.
# Each node has a distinct value between 1 and 1000.
# to_delete.length <= 1000
# to_delete contains distinct values between 1 and 1000.

from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def dfs(
        self,
        node: Optional[TreeNode],
        parent: TreeNode,
        to_del: set[int],
        isLeft: int,
        disjoint_list: List[TreeNode],
    ):
        if node is None:
            return

        if node.val in to_del:
            if isLeft and parent is not None:
                parent.left = None
            elif not isLeft and parent is not None:
                parent.right = None

            if node.left and node.left.val not in to_del:
                disjoint_list.append(node.left)

            if node.right and node.right.val not in to_del:
                disjoint_list.append(node.right)

        self.dfs(node.left, node, to_del, True, disjoint_list)
        self.dfs(node.right, node, to_del, False, disjoint_list)

    def delNodes(
        self, root: Optional[TreeNode], to_delete: List[int]
    ) -> List[TreeNode]:
        to_del = set(to_delete)
        res = []

        if root and root.val not in to_del:
            res.append(root)

        self.dfs(root, None, to_del, False, res)

        return res
