import heapq
import math


# For huge addedge operations and few shortest path queries
class GraphDjikstra:
    def __init__(self, n: int, edges: list[list[int]]):
        self.adjacency_list = {}

        for edge in edges:
            self.addEdge(edge)

    def addEdge(self, edge: list[int]) -> None:
        [from_, to_, dist] = edge

        self.adjacency_list.setdefault(from_, []).append([to_, dist])

    def shortestPath(self, node1: int, node2: int) -> int:
        pq = []
        visited = {}

        heapq.heappush(pq, (0, node1))

        while pq:
            (dist, src) = heapq.heappop(pq)

            visited[src] = dist

            if src == node2:
                return dist

            for next_dst, next_dist in self.adjacency_list.get(src, []):
                new_dist = dist + next_dist
                if new_dist < visited.get(next_dst, math.inf):
                    heapq.heappush(pq, (new_dist, next_dst))

        return -1


# For few addedge operations and huge shortest path queries
class GraphFloydWarshall:
    def __init__(self, n: int, edges: list[list[int]]):
        self.ad_list = [[math.inf] * n for i in range(n)]
        self.buildAdList(edges, n)

    def buildAdList(self, edges, n):
        for i in range(n):
            self.ad_list[i][i] = 0

        for u, v, w in edges:
            self.ad_list[u][v] = w

        # create every path using each node as the mid
        for m in range(n):
            for i in range(n):
                for j in range(n):
                    self.ad_list[i][j] = min(
                        self.ad_list[i][j], self.ad_list[i][m] + self.ad_list[m][j]
                    )

    def addEdge(self, edge: list[int]) -> None:
        [u, v, w] = edge
        n = len(self.ad_list)

        for i in range(n):
            for j in range(n):
                self.ad_list[i][j] = min(
                    self.ad_list[i][j], self.ad_list[i][u] + self.ad_list[v][j] + w
                )

    def shortestPath(self, node1: int, node2: int) -> int:
        return (
            -1 if self.ad_list[node1][node2] == math.inf else self.ad_list[node1][node2]
        )


# Your Graph object will be instantiated and called as such:
# obj = Graph(n, edges)
# obj.addEdge(edge)
# param_2 = obj.shortestPath(node1,node2)
