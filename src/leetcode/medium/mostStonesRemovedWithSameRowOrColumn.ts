/**
    * desc: On a 2D plane, we place n stones at some integer coordinate points. Each coordinate point may have at most one stone.

    A stone can be removed if it shares either the same row or the same column as another stone that has not been removed.

    Given an array stones of length n where stones[i] = [xi, yi] represents the location of the ith stone, return the largest possible number of stones that can be removed.

    Example 1: =>
    Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
    Output: 5
    Explanation: One way to remove 5 stones is as follows:
    1. Remove stone [2,2] because it shares the same row as [2,1].
    2. Remove stone [2,1] because it shares the same column as [0,1].
    3. Remove stone [1,2] because it shares the same row as [1,0].
    4. Remove stone [1,0] because it shares the same column as [0,0].
    5. Remove stone [0,1] because it shares the same row as [0,0].
    Stone [0,0] cannot be removed since it does not share a row/column with another stone still on the plane.
    
    Example 2: =>
    Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
    Output: 3
    Explanation: One way to make 3 moves is as follows:
    1. Remove stone [2,2] because it shares the same row as [2,0].
    2. Remove stone [2,0] because it shares the same column as [0,0].
    3. Remove stone [0,2] because it shares the same row as [0,0].
    Stones [0,0] and [1,1] cannot be removed since they do not share a row/column with another stone still on the plane.

    Example 3: =>
    Input: stones = [[0,0]]
    Output: 0
    Explanation: [0,0] is the only stone on the plane, so you cannot remove it.

    Constraints: =>
    1 <= stones.length <= 1000
    0 <= xi, yi <= 104
    No two stones are at the same coordinate point.
 */

/**
 *
 * @param adjacencyList number[][]
 * @param seen boolean[]
 * @param currIndex number
 * @returns void
 */
const dfs = (
	adjacencyList: number[][],
	seen: boolean[],
	currIndex: number
): void => {
	if (seen[currIndex]) return;

	seen[currIndex] = true;

	for (let neigbour of adjacencyList[currIndex]) {
		dfs(adjacencyList, seen, neigbour);
	}
};

/**
 *
 * @param stones number[][]
 * @returns number
 */
const removeStonesDFS = (stones: number[][]): number => {
	const adjacencyList: number[][] = new Array(stones.length)
		.fill(0)
		.map((val) => []);
	const seen: boolean[] = new Array(stones.length).fill(false);
	let count: number = 0;

	for (let i = 0; i < stones.length; i++) {
		let currStone: number[] = stones[i];

		for (let j = 0; j < stones.length; j++) {
			let otherStone: number[] = stones[j];

			if (i === j) continue;

			if (currStone[0] === otherStone[0] || currStone[1] === otherStone[1]) {
				adjacencyList[i].push(j);
			}
		}
	}

	for (let i = 0; i < stones.length; i++) {
		if (seen[i]) continue;

		dfs(adjacencyList, seen, i);

		count += 1;
	}

	return stones.length - count;
};

/**
 * =================================================Using Union Find =================================================================================================
 */

class UnionFind {
	private parents: Map<number, number>;
	private count: number;

	constructor() {
		this.parents = new Map();
		this.count = 0;
	}

	get Count(): number {
		return this.count;
	}

	find(x: number): number {
		if (!this.parents.has(x)) {
			this.parents.set(x, x);
			this.count += 1;
			return x;
		} else {
			if (x === this.parents.get(x)) {
				return x;
			} else {
				this.parents.set(x, this.find(this.parents.get(x)!));
				return this.parents.get(x)!;
			}
		}
	}

	union(x: number, y: number): void {
		let getX: number = this.find(x);
		let getY: number = this.find(y);

		if (getX === getY) return;

		this.parents.set(getX, getY);
		this.count -= 1;
	}
}

const removeStonesUnionFind = (stones: number[][]): number => {
	const unionFind: UnionFind = new UnionFind();

	for (let stone of stones) {
		unionFind.union(stone[0] + 10001, stone[1]);
	}

	return stones.length - unionFind.Count;
};
