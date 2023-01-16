/**
    * desc: There is a tree (i.e. a connected, undirected graph with no cycles) consisting of n nodes numbered from 0 to n - 1 and exactly n - 1 edges.

    You are given a 0-indexed integer array vals of length n where vals[i] denotes the value of the ith node. You are also given a 2D integer array edges where edges[i] = [ai, bi] denotes that there exists an undirected edge connecting nodes ai and bi.

    A good path is a simple path that satisfies the following conditions:

    The starting node and the ending node have the same value.
    All nodes between the starting node and the ending node have values less than or equal to the starting node (i.e. the starting node's value should be the maximum value along the path).
    Return the number of distinct good paths.

    Note that a path and its reverse are counted as the same path. For example, 0 -> 1 is considered to be the same as 1 -> 0. A single node is also considered as a valid path.

    Example 1:  =>
    Input: vals = [1,3,2,1,3], edges = [[0,1],[0,2],[2,3],[2,4]]
    Output: 6
    Explanation: There are 5 good paths consisting of a single node.
    There is 1 additional good path: 1 -> 0 -> 2 -> 4.
    (The reverse path 4 -> 2 -> 0 -> 1 is treated as the same as 1 -> 0 -> 2 -> 4.)
    Note that 0 -> 2 -> 3 is not a good path because vals[2] > vals[0].
    
    Example 2: =>
    Input: vals = [1,1,2,2,3], edges = [[0,1],[1,2],[2,3],[2,4]]
    Output: 7
    Explanation: There are 5 good paths consisting of a single node.
    There are 2 additional good paths: 0 -> 1 and 2 -> 3.
    
    Example 3: =>
    Input: vals = [1], edges = []
    Output: 1
    Explanation: The tree consists of only one node, so there is one good path.
    
    Constraints: =>
    n == vals.length
    1 <= n <= 3 * 104
    0 <= vals[i] <= 105
    edges.length == n - 1
    edges[i].length == 2
    0 <= ai, bi < n
    ai != bi
    edges represents a valid tree.
 */

/**
 *
 * @param vals number[]
 * @param edges number[][]
 * @returns number
 */
const numberOfGoodPathsTLE = (vals: number[], edges: number[][]): number => {
	let res: number = 0;

	const adjList: Map<number, number[]> = new Map();

	for (let edge of edges) {
		adjList.set(edge[0], [...(adjList.get(edge[0]) ?? []), edge[1]]);
		adjList.set(edge[1], [...(adjList.get(edge[1]) ?? []), edge[0]]);
	}

	const dfs = (currIdx: number, val: number, visited: boolean[]) => {
		if (val !== -1 && vals[currIdx] > val) return;

		if (vals[currIdx] === val) {
			res += 1;
		}

		visited[currIdx] = true;

		if (val === -1) val = vals[currIdx];

		for (let child of adjList.get(currIdx)!) {
			if (visited[child]) continue;
			dfs(child, val, visited);
		}
	};

	for (let key of adjList.keys()) {
		const visited: boolean[] = new Array(vals.length).fill(false);

		dfs(key, -1, visited);
	}

	return ~~(res / 2) + vals.length;
};

const numberOfGoodPathsDSU = (vals: number[], edges: number[][]): number => {
	let res: number = 0;

	const adjList: Map<number, number[]> = new Map();
	const valList: Map<number, number[]> = new Map();
	const DSU: number[] = new Array(vals.length).fill(0).map((_, idx) => idx);

	for (let i = 0; i < vals.length; i++) {
		valList.set(vals[i], [...(valList.get(vals[i]) ?? []), i]);
	}

	const valListAsc = new Map(
		[...valList.entries()].sort((a, b) => a[0] - b[0])
	);

	const find = (num: number): number => {
		if (DSU[num] === num) {
			return num;
		} else {
			return (DSU[num] = find(DSU[num]));
		}
	};

	const combine = (num1: number, num2: number) => {
		const u: number = find(num1);
		const v: number = find(num2);

		if (u !== v) {
			if (u > v) {
				DSU[v] = u;
			} else {
				DSU[u] = v;
			}
		}
	};

	for (let edge of edges) {
		if (vals[edge[0]] > vals[edge[1]]) {
			adjList.set(edge[0], [...(adjList.get(edge[0]) ?? []), edge[1]]);
			adjList.set(edge[1], adjList.get(edge[1]) ?? []);
		} else {
			adjList.set(edge[0], adjList.get(edge[0]) ?? []);
			adjList.set(edge[1], [...(adjList.get(edge[1]) ?? []), edge[0]]);
		}
	}

	for (let [_, value] of valListAsc.entries()) {
		for (let sameNode of value) {
			for (let child of adjList.get(sameNode) ?? []) {
				combine(sameNode, child);
			}
		}

		const allNodes: Map<number, number> = new Map();

		for (let sameNode of value) {
			let parent: number = find(sameNode);
			allNodes.set(parent, (allNodes.get(parent) ?? 0) + 1);
		}

		res += value.length;

		for (let value of allNodes.values()) {
			res += (value * (value - 1)) / 2;
		}
	}

	return res;
};
