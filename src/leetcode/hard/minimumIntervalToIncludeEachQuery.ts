const { MinPriorityQueue } = require('@datastructures-js/priority-queue');

const minInterval = (intervals: number[][], queries: number[]): number[] => {
	const result: number[] = [];
	const queriesMap: Map<number, number[]> = new Map();
	const minPriorityQueue = new MinPriorityQueue();

	intervals.sort((a, b) => a[0] - b[0]);

	// sort intervals according to range start in ascending order.
	// sort the queries in ascending order and keep their indexes in map.
	// map through each query and push intervals into priority queue
	// clean priority queue
	// get min interval and push to result
	// rinse and repeat.

	for (let i = 0; i < queries.length; i++) {
		queriesMap.set(queries[i], [...(queriesMap.get(queries[i]) ?? []), i]);
	}

	queries.sort((a, b) => a - b);

	let i = 0;

	for (let query of queries) {
		if (!queriesMap.has(query)) continue;

		while (i < intervals.length && query >= intervals[i][0]) {
			minPriorityQueue.enqueue(
				intervals[i][1],
				intervals[i][1] - intervals[i][0] + 1
			);
			i++;
		}

		while (
			minPriorityQueue.size() > 0 &&
			minPriorityQueue.front()?.element < query
		) {
			minPriorityQueue.dequeue();
		}

		if (minPriorityQueue.front()?.priority) {
			let sizeOfInterval: number = minPriorityQueue.front().priority;

			for (let index of queriesMap.get(query)!) {
				result[index] = sizeOfInterval;
			}
		} else {
			for (let index of queriesMap.get(query)!) {
				result[index] = -1;
			}
		}

		queriesMap.delete(query);
	}

	return result;
};
