/**
    * desc: You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

    Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

    Return intervals after the insertion.

    Example 1: =>
    Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
    Output: [[1,5],[6,9]]
    
    Example 2: =>
    Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
    Output: [[1,2],[3,10],[12,16]]
    Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
    
    Constraints: =>
    0 <= intervals.length <= 104
    intervals[i].length == 2
    0 <= starti <= endi <= 105
    intervals is sorted by starti in ascending order.
    newInterval.length == 2
    0 <= start <= end <= 105
 */

/**
 *
 * @param intervals number[][]
 * @param newInterval number[]
 * @returns number[][]
 */
const insert = (intervals: number[][], newInterval: number[]): number[][] => {
	if (
		intervals.length === 0 ||
		intervals[intervals.length - 1][1] < newInterval[0]
	) {
		intervals.push(newInterval);
		return intervals;
	}

	let newEnd: number = -1;
	let indexEditing: number = -1;

	for (let i = 0; i < intervals.length; i++) {
		let [start, end] = intervals[i];
		let [newIntervalStart, newIntervalEnd] = newInterval;

		if (newEnd === -1) {
			if (start > newIntervalEnd) {
				intervals.splice(i, 0, newInterval);
				break;
			}
			if (newIntervalStart <= end) {
				if (newEnd === -1) intervals[i][0] = Math.min(start, newIntervalStart);
				newEnd = Math.max(end, newIntervalEnd);
				intervals[i][1] = newEnd;
				indexEditing = i;
			}
		} else {
			if (start <= newEnd) {
				newEnd = Math.max(end, newIntervalEnd);
				intervals[indexEditing][1] = newEnd;
				intervals.splice(i, 1);
				i -= 1;
			} else {
				break;
			}
		}
	}

	return intervals;
};
