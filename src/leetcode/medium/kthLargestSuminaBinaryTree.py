import heapq
from typing import Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def kthLargestLevelSum(self, root: Optional[TreeNode], k: int) -> int:
        queue = [root]
        heap = []

        while queue:
            length = len(queue)

            sum_ = 0

            for i in range(length):
                curr = queue.pop(0)

                sum_ += curr.val

                if curr.left:
                    queue.append(curr.left)

                if curr.right:
                    queue.append(curr.right)

            heapq.heappush(heap, -sum_)

        for i in range(min(len(heap), k - 1)):
            heapq.heappop(heap)

        return -heapq.heappop(heap) if heap else - 1