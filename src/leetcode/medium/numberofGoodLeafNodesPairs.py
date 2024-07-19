# You are given the root of a binary tree and an integer distance. A pair of two different leaf nodes of a binary tree is said to be good if the length of the shortest path between them is less than or equal to distance.

# Return the number of good leaf node pairs in the tree.

# Example 1: =>
# Input: root = [1,2,3,null,4], distance = 3
# Output: 1
# Explanation: The leaf nodes of the tree are 3 and 4 and the length of the shortest path between them is 3. This is the only good pair.

# Example 2: =>
# Input: root = [1,2,3,4,5,6,7], distance = 3
# Output: 2
# Explanation: The good pairs are [4,5] and [6,7] with shortest path = 2. The pair [4,6] is not good because the length of ther shortest path between them is 4.

# Example 3: =>
# Input: root = [7,1,4,6,null,5,3,null,null,null,null,null,2], distance = 3
# Output: 1
# Explanation: The only good pair is [2,5].

# Constraints: =>
# The number of nodes in the tree is in the range [1, 210].
# 1 <= Node.val <= 100
# 1 <= distance <= 10

# Definition for a binary tree node.
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class SolutionTimeout:
    def isLeafNode(self, node: TreeNode) -> bool:
        return node.left is node.right

    def getAllLeafNodes(self, node: TreeNode, leafNodes: list[TreeNode]):
        if self.isLeafNode(node):
            leafNodes.append(node)
            return

        if node.left:
            self.getAllLeafNodes(node.left, leafNodes)

        if node.right:
            self.getAllLeafNodes(node.right, leafNodes)

    def getPath(
        self, root: Optional[TreeNode], node: TreeNode, path: list[str]
    ) -> bool:
        if root is None:
            return False

        if root == node:
            return True

        path.append("L")
        if self.getPath(root.left, node, path):
            return True

        path.pop()

        path.append("R")
        if self.getPath(root.right, node, path):
            return True

        path.pop()
        return False

    def getDistance(
        self, root: TreeNode, startNode: TreeNode, endNode: TreeNode
    ) -> int:
        startPath = []
        endPath = []

        self.getPath(root, startNode, startPath)
        self.getPath(root, endNode, endPath)

        # print(startPath, endPath)

        n = len(endPath)
        m = len(startPath)

        i = 0
        while i < n and i < m and startPath[i] == endPath[i]:
            i += 1

        return (n - i) + (m - i)

    def countPairs(self, root: TreeNode, distance: int) -> int:
        allLeafNodes: list[TreeNode] = []

        self.getAllLeafNodes(root, allLeafNodes)

        n = len(allLeafNodes)

        goodPairs = 0

        for i in range(n - 1):
            for j in range(i + 1, n):
                curr_distance = self.getDistance(root, allLeafNodes[i], allLeafNodes[j])

                if curr_distance <= distance:
                    goodPairs += 1

        return goodPairs


class SolutionOptimized:
    def isLeafNode(self, node: TreeNode) -> bool:
        return node.left is node.right

    def getAllLeafNodesPaths(self, node: TreeNode, leafNodes: list[TreeNode], path):
        if self.isLeafNode(node):
            leafNodes.append(path.copy())
            return

        if node.left:
            path.append("L")
            self.getAllLeafNodesPaths(node.left, leafNodes, path)
            path.pop()

        if node.right:
            path.append("R")
            self.getAllLeafNodesPaths(node.right, leafNodes, path)
            path.pop()

    def getDistance(
        self, root: TreeNode, startPath: list[str], endPath: list[str]
    ) -> int:
        n = len(endPath)
        m = len(startPath)

        i = 0
        while i < n and i < m and startPath[i] == endPath[i]:
            i += 1

        return (n - i) + (m - i)

    def countPairs(self, root: TreeNode, distance: int) -> int:
        allLeafNodesPaths: list[TreeNode] = []
        path = []

        self.getAllLeafNodesPaths(root, allLeafNodesPaths, path)

        n = len(allLeafNodesPaths)

        goodPairs = 0

        for i in range(n - 1):
            for j in range(i + 1, n):
                curr_distance = self.getDistance(
                    root, allLeafNodesPaths[i], allLeafNodesPaths[j]
                )

                if curr_distance <= distance:
                    goodPairs += 1

        return goodPairs


class SolutionBFS:
    def isLeafNode(self, node: TreeNode) -> bool:
        return node.left is node.right

    def getAllLeafNodes(
        self,
        parent: Optional[TreeNode],
        node: TreeNode,
        leafNodes: set[TreeNode],
        graph: dict,
    ):
        if self.isLeafNode(node):
            leafNodes.add(node)

        if parent is not None:
            if parent not in graph:
                graph[parent] = []

            graph[parent].append(node)

            if node not in graph:
                graph[node] = []

            graph[node].append(parent)

        if node.left:
            self.getAllLeafNodes(node, node.left, leafNodes, graph)

        if node.right:
            self.getAllLeafNodes(node, node.right, leafNodes, graph)

    def countPairs(self, root: TreeNode, distance: int) -> int:
        allLeafNodes: set[TreeNode] = set()
        graph = {}

        self.getAllLeafNodes(None, root, allLeafNodes, graph)

        goodPairs = 0

        for leafNode in allLeafNodes:
            queue = []

            queue.append(leafNode)
            seen = set()

            seen.add(leafNode)

            for i in range(distance + 1):
                size = len(queue)

                i = 0
                while i < size:
                    curr_node = queue.pop(0)

                    if curr_node in allLeafNodes and curr_node != leafNode:
                        goodPairs += 1

                    if curr_node in graph:
                        for neighbour in graph[curr_node]:
                            if neighbour not in seen:
                                queue.append(neighbour)
                                seen.add(neighbour)

                    i += 1

        return goodPairs // 2
