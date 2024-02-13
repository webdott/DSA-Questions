# Desc: You are given the root of a binary tree with unique values, and an integer start. At minute 0, an infection starts from the node with value start.

# Each minute, a node becomes infected if:

# The node is currently uninfected.
# The node is adjacent to an infected node.
# Return the number of minutes needed for the entire tree to be infected.

# Example 1: =>
# Input: root = [1,5,3,null,4,10,6,9,2], start = 3
# Output: 4
# Explanation: The following nodes are infected during:
# - Minute 0: Node 3
# - Minute 1: Nodes 1, 10 and 6
# - Minute 2: Node 5
# - Minute 3: Node 4
# - Minute 4: Nodes 9 and 2
# It takes 4 minutes for the whole tree to be infected so we return 4.

# Example 2: =>
# Input: root = [1], start = 1
# Output: 0
# Explanation: At minute 0, the only node in the tree is infected so we return 0.

# Constraints: =>
# The number of nodes in the tree is in the range [1, 105].
# 1 <= Node.val <= 105
# Each node has a unique value.
# A node with a value of start exists in the tree.


# Definition for a binary tree node.
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isLeaf(self, node: TreeNode) -> bool:
        return node.left is None and node.right is None

    def bfs(self, undir_graph: dict, start: int) -> int:
        time = 0

        queue = [[start, 0]]
        seen = set()

        while len(queue) > 0:
            [curr_node, curr_time] = queue[0]

            time = max(time, curr_time)

            queue.pop(0)

            seen.add(curr_node)

            if curr_node in undir_graph:
                for next_node in undir_graph[curr_node]:
                    if next_node not in seen:
                        queue.append([next_node, curr_time + 1])

        return time

    def special_dfs(self, node: TreeNode, dir: dict):
        if self.isLeaf(node):
            return

        if node.val not in dir:
            dir[node.val] = []

        if node.left:
            dir[node.left.val] = []
            dir[node.val].append(node.left.val)
            dir[node.left.val].append(node.val)
            self.special_dfs(node.left, dir)

        if node.right:
            dir[node.right.val] = []
            dir[node.val].append(node.right.val)
            dir[node.right.val].append(node.val)
            self.special_dfs(node.right, dir)

    def amountOfTime(self, root: Optional[TreeNode], start: int) -> int:
        undir_graph = {}

        self.special_dfs(root, undir_graph)

        return self.bfs(undir_graph, start)
