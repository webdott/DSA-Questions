/**
    * desc: Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.

    Example 1: =>
    Input: points = [[1,1],[2,2],[3,3]]
    Output: 3
    
    Example 2: =>
    Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
    Output: 4

    Constraints: =>
    1 <= points.length <= 300
    points[i].length == 2
    -104 <= xi, yi <= 104
    All the points are unique.
 */

/**
 *
 * @param points number[][]
 * @returns number
 */
const maxPoints = (points: number[][]): number => {
	let max: number = 1;

	for (let i = 0; i < points.length - 1; i++) {
		let currMax: number = 0;
		const map: Map<number, number> = new Map();

		for (let j = i + 1; j < points.length; j++) {
            // idea is to use slope, and get the maximum number of points that give the same slope w.r.t same origin
			let slope: number =
				(points[j][1] - points[i][1]) / (points[j][0] - points[i][0]);
			slope = slope === -Infinity ? Infinity : slope;
			map.set(slope, (map.get(slope) ?? 1) + 1);
			currMax = Math.max(currMax, map.get(slope)!);
		}

		max = Math.max(max, currMax);
	}

	return max;
};
