import { MinPriorityQueue } from '@datastructures-js/priority-queue';

/**
    * desc: You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].

    The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.

    Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

    Example 1: =>
    Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
    Output: 20
    Explanation: 
    We can connect the points as shown above to get the minimum cost of 20.
    Notice that there is a unique path between every pair of points.
    
    Example 2: =>
    Input: points = [[3,12],[-2,5],[-4,1]]
    Output: 18
    
    Constraints: =>
    1 <= points.length <= 1000
    -106 <= xi, yi <= 106
    All pairs (xi, yi) are distinct.
 */

/**
 *
 * @param pointA number[]
 * @param pointB number[]
 * @returns number
 */
const getWeight = (pointA: number[], pointB: number[]): number => {
	const [xi, yi] = pointA;
	const [xj, yj] = pointB;

	return Math.abs(xi - xj) + Math.abs(yi - yj);
};

/**
 *
 * @param points number[][]
 * @returns number
 */
const minCostConnectPointsPrim = (points: number[][]): number => {
	const minPriorityQueue = new MinPriorityQueue();
	const visited: Set<number> = new Set();
	const lowestEdges: Record<number, number> = { 0: 0 };
	let totalMST: number = 0;

	//@ts-ignore
	minPriorityQueue.enqueue(0, 0);

	while (minPriorityQueue.size() > 0) {
		const pair = minPriorityQueue.dequeue();
		// @ts-ignore
		const point: number = pair.element;
		// @ts-ignore
		const weight: number = pair.priority;

		if (
			visited.has(point) ||
			(lowestEdges[point] !== undefined ? lowestEdges[point] : Infinity) <
				weight
		)
			continue;

		totalMST += weight;

		visited.add(point);

		for (let i = 0; i < points.length; i++) {
			if (visited.has(i)) continue;

			const distanceToPoint = getWeight(points[point], points[i]);

			if ((lowestEdges[i] ?? Infinity) < distanceToPoint) continue;

			lowestEdges[i] = distanceToPoint;
			// @ts-ignore
			minPriorityQueue.enqueue(i, distanceToPoint);
		}
	}

	return totalMST;
};

class UnionFind {
	private rank: number[];
	private parent: number[];

	constructor(size: number) {
		this.rank = Array(size).fill(1);
		this.parent = Array(size)
			.fill(0)
			.map((_, idx) => idx);
	}

	find(point: number): number {
		if (this.parent[point] === point) return point;

		return (this.parent[point] = this.find(this.parent[point]));
	}

	union(pointA: number, pointB: number) {
		const parentA: number = this.find(pointA);
		const parentB: number = this.find(pointB);

		if (parentA === parentB) return;

		if (this.rank[parentA] > this.rank[parentB]) {
			this.rank[parentA] += this.rank[parentB];
			this.parent[parentB] = parentA;
		} else {
			this.rank[parentB] += this.rank[parentA];
			this.parent[parentA] = parentB;
		}
	}
}

const minCostConnectPointsKrusal = (points: number[][]): number => {
	const uf = new UnionFind(points.length);
	let totalMST: number = 0;
	const edgesList: number[][] = [];

	for (let i = 0; i < points.length; i++) {
		for (let j = i + 1; j < points.length; j++) {
			const weight: number = getWeight(points[i], points[j]);

			edgesList.push([weight, i, j]);
		}
	}

	let edgesSeen: number = 0;

	edgesList.sort((a, b) => a[0] - b[0]);

	for (let edge of edgesList) {
		const [weight, u, v] = edge;

		if (uf.find(u) === uf.find(v)) continue;

		totalMST += weight;
		uf.union(u, v);
		edgesSeen += 1;

		if (edgesSeen === points.length - 1) break;
	}

	return totalMST;
};
