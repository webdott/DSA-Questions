# Given a binary tree where node values are digits from 1 to 9. A path in the binary tree is said to be pseudo-palindromic if at least one permutation of the node values in the path is a palindrome.

# Return the number of pseudo-palindromic paths going from the root node to leaf nodes.

# Example 1: =>
# Input: root = [2,3,1,3,1,null,1]
# Output: 2
# Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the red path [2,3,3], the green path [2,1,1], and the path [2,3,1]. Among these paths only red path and green path are pseudo-palindromic paths since the red path [2,3,3] can be rearranged in [3,2,3] (palindrome) and the green path [2,1,1] can be rearranged in [1,2,1] (palindrome).

# Example 2: =>
# Input: root = [2,1,1,1,3,null,null,null,null,null,1]
# Output: 1
# Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the green path [2,1,1], the path [2,1,3,1], and the path [2,1]. Among these paths only the green path is pseudo-palindromic since [2,1,1] can be rearranged in [1,2,1] (palindrome).

# Example 3: =>
# Input: root = [9]
# Output: 1

# Constraints: =>
# The number of nodes in the tree is in the range [1, 105].
# 1 <= Node.val <= 9


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def __init__(self):
        self.pseudoPaths = 0

    def isLeafNode(Self, node: TreeNode) -> bool:
        return node.left is None and node.right is None

    def isPseudoPalindrome(self, values: [int]) -> bool:
        odds = 0

        # idea for pseudo palindromic path is that we have at most only one odd occuring number
        for i in range(len(values)):
            if values[i] % 2 > 0:
                odds += 1

            if odds > 1:
                return False

        return True

    def dfs(self, node: TreeNode, concatValues: [int]):
        concatValues[node.val - 1] += 1

        if self.isLeafNode(node):
            self.pseudoPaths += 1 if self.isPseudoPalindrome(concatValues) else 0

        if node.left:
            self.dfs(node.left, concatValues)

        if node.right:
            self.dfs(node.right, concatValues)

        concatValues[node.val - 1] -= 1

    def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:
        self.dfs(root, [0] * 9)

        return self.pseudoPaths
