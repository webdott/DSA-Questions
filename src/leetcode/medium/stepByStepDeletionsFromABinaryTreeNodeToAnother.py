# You are given the root of a binary tree with n nodes. Each node is uniquely assigned a value from 1 to n. You are also given an integer startValue representing the value of the start node s, and a different integer destValue representing the value of the destination node t.

# Find the shortest path starting from node s and ending at node t. Generate step-by-step directions of such path as a string consisting of only the uppercase letters 'L', 'R', and 'U'. Each letter indicates a specific direction:

# 'L' means to go from a node to its left child node.
# 'R' means to go from a node to its right child node.
# 'U' means to go from a node to its parent node.
# Return the step-by-step directions of the shortest path from node s to node t.

# Example 1: =>
# Input: root = [5,1,2,3,null,6,4], startValue = 3, destValue = 6
# Output: "UURL"
# Explanation: The shortest path is: 3 → 1 → 5 → 2 → 6.

# Example 2: =>
# Input: root = [2,1], startValue = 2, destValue = 1
# Output: "L"
# Explanation: The shortest path is: 2 → 1.

# Constraints: =>
# The number of nodes in the tree is n.
# 2 <= n <= 105
# 1 <= Node.val <= n
# All the values in the tree are unique.
# 1 <= startValue, destValue <= n
# startValue != destValue


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def getDirections(self, root: TreeNode, startValue: int, destValue: int) -> str:
        def findStartNode(root: TreeNode, startValue: int, currStr: list[str]):
            if root is None:
                return

            currStr.append(root.val)

            if root.val == startValue:
                return currStr.copy()

            res1 = findStartNode(root.left, startValue, currStr)
            res2 = findStartNode(root.right, startValue, currStr)

            if res1:
                return res1

            if res2:
                return res2

            currStr.pop()

            return None

        def findEndNode(
            root: TreeNode, destValue: int, currStr: list[str], dest_map: dict
        ):
            if root is None:
                return

            currStr.append(root.val)

            if root.val == destValue:
                return currStr.copy()

            res1 = findEndNode(root.left, destValue, currStr, dest_map)
            res2 = findEndNode(root.right, destValue, currStr, dest_map)

            if root.left:
                dest_map[root.left.val] = "L"

            if root.right:
                dest_map[root.right.val] = "R"

            if res1:
                return res1

            if res2:
                return res2

            currStr.pop()

            return None

        startStr = findStartNode(root, startValue, [])

        dest_map = {}
        endStr = findEndNode(root, destValue, [], dest_map)

        i, j = 0, 0

        n = len(startStr)
        m = len(endStr)

        while i < n and j < m:
            if startStr[i] == endStr[j]:
                i += 1
                j += 1
            else:
                break

        res = ""

        res += "U" * (n - i)

        while j < m:
            res += dest_map[endStr[j]]
            j += 1

        return res
