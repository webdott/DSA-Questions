# Alice and Bob have an undirected graph of n nodes and three types of edges:

# Type 1: Can be traversed by Alice only.
# Type 2: Can be traversed by Bob only.
# Type 3: Can be traversed by both Alice and Bob.
# Given an array edges where edges[i] = [typei, ui, vi] represents a bidirectional edge of type typei between nodes ui and vi, find the maximum number of edges you can remove so that after removing the edges, the graph can still be fully traversed by both Alice and Bob. The graph is fully traversed by Alice and Bob if starting from any node, they can reach all other nodes.

# Return the maximum number of edges you can remove, or return -1 if Alice and Bob cannot fully traverse the graph.

# Example 1: =>
# Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]
# Output: 2
# Explanation: If we remove the 2 edges [1,1,2] and [1,1,3]. The graph will still be fully traversable by Alice and Bob. Removing any additional edge will not make it so. So the maximum number of edges we can remove is 2.

# Example 2: =>
# Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,4],[2,1,4]]
# Output: 0
# Explanation: Notice that removing any edge will not make the graph fully traversable by Alice and Bob.

# Example 3:
# Input: n = 4, edges = [[3,2,3],[1,1,2],[2,3,4]]
# Output: -1
# Explanation: In the current graph, Alice cannot reach node 4 from the other nodes. Likewise, Bob cannot reach 1. Therefore it's impossible to make the graph fully traversable.

# Constraints: =>
# 1 <= n <= 105
# 1 <= edges.length <= min(105, 3 * n * (n - 1) / 2)
# edges[i].length == 3
# 1 <= typei <= 3
# 1 <= ui < vi <= n
# All tuples (typei, ui, vi) are distinct.


from typing import List


class UnionFind:
    def __init__(self, n: int):
        self.group = [i for i in range(n)]
        self.rank = [0] * n

    def find(self, i: int):
        if self.group[i] != i:
            self.group[i] = self.find(self.group[i])

        return self.group[i]

    def union(self, i: int, j: int) -> bool:
        u = self.find(i)
        v = self.find(j)

        if u == v:
            return False
        elif self.rank[u] > self.rank[v]:
            self.group[v] = u
            self.rank[u] += self.rank[v]
        else:
            self.group[u] = v
            self.rank[v] += self.rank[u]

        return True

    def isConnected(self, i: int, j: int) -> bool:
        return self.find(i) == self.find(j)

    def isAllConnected(self) -> bool:
        n = len(self.group)
        for i in range(n - 1):
            j = i + 1

            if not self.isConnected(i, j):
                return False

        return True


class Solution:
    def maxNumEdgesToRemove(self, n: int, edges: List[List[int]]) -> int:
        alice = UnionFind(n)
        bob = UnionFind(n)

        req_connections = 0

        for edge in edges:
            edge_type, n1, n2 = edge

            if edge_type == 3:
                alice_just_connected = alice.union(n1 - 1, n2 - 1)
                bob_just_connected = bob.union(n1 - 1, n2 - 1)

                if alice_just_connected or bob_just_connected:
                    req_connections += 1

        for edge in edges:
            edge_type, n1, n2 = edge

            if edge_type == 2:
                bob_just_connected = bob.union(n1 - 1, n2 - 1)

                if bob_just_connected:
                    req_connections += 1
            elif edge_type == 1:
                alice_just_connected = alice.union(n1 - 1, n2 - 1)

                if alice_just_connected:
                    req_connections += 1

        return (
            len(edges) - req_connections
            if alice.isAllConnected() and bob.isAllConnected()
            else -1
        )
