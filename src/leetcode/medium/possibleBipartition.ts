/**
    * desc: We want to split a group of n people (labeled from 1 to n) into two groups of any size. Each person may dislike some other people, and they should not go into the same group.

    Given the integer n and the array dislikes where dislikes[i] = [ai, bi] indicates that the person labeled ai does not like the person labeled bi, return true if it is possible to split everyone into two groups in this way.

    Example 1: =>
    Input: n = 4, dislikes = [[1,2],[1,3],[2,4]]
    Output: true
    Explanation: group1 [1,4] and group2 [2,3].
    
    Example 2: =>
    Input: n = 3, dislikes = [[1,2],[1,3],[2,3]]
    Output: false
    
    Example 3: =>
    Input: n = 5, dislikes = [[1,2],[2,3],[3,4],[4,5],[1,5]]
    Output: false

    Constraints: =>
    1 <= n <= 2000
    0 <= dislikes.length <= 104
    dislikes[i].length == 2
    1 <= dislikes[i][j] <= n
    ai < bi
    All the pairs of dislikes are unique.
 */

/**
 *
 * @param n number
 * @param dislikes number[][]
 * @returns boolean
 */
const possibleBipartition = (n: number, dislikes: number[][]): boolean => {
	const adjList: Map<number, number[]> = new Map();
	const colors: number[] = new Array(n).fill(-1);
	const seen: Set<number> = new Set();

	for (let dislike of dislikes) {
		adjList.set(dislike[0], [...(adjList.get(dislike[0]) ?? []), dislike[1]]);
		adjList.set(dislike[1], [...(adjList.get(dislike[1]) ?? []), dislike[0]]);
	}

	const queue: number[] = [];

	for (let i = 1; i <= n; i++) {
		if (colors[i - 1] !== -1) continue;

		if (adjList.has(i)) queue.push(i);

		while (queue.length > 0) {
			let currPerson = queue.shift()!;
			if (seen.has(currPerson)) continue;

			if (colors[currPerson - 1] === -1)
				colors[currPerson - 1] = 1 + colors[currPerson - 1];

			seen.add(currPerson);

			for (let person of adjList.get(currPerson)!) {
				if (colors[person - 1] === colors[currPerson - 1]) return false;

				colors[person - 1] = colors[currPerson - 1] === 1 ? 0 : 1;

				queue.push(person);
			}
		}
	}

	return true;
};
