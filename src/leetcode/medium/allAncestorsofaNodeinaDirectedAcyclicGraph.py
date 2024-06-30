from collections import defaultdict
from typing import List


class Solution:
    def getAncestors(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        res = [set() for i in range(n)]
        adjList = defaultdict(list)

        for edge in edges:
            [e1, e2] = edge

            adjList[e1].append(e2)

        def dfs(node: int, adjList, seen, currList):
            res[node].update(currList)
            currList.add(node)
            seen.add(node)

            for nextNode in adjList[node]:
                if nextNode not in seen:
                    dfs(nextNode, adjList, seen, currList)

            currList.remove(node)

        for node in adjList.copy().keys():
            dfs(node, adjList, set(), set())

        return [sorted(list(le)) for le in res]
