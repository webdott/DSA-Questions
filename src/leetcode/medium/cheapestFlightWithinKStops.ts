import { MinPriorityQueue } from '@datastructures-js/priority-queue';

// TLE
// function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
//     const adjList: Map<number, number[][]> = new Map();
//     const seen: Map<number, number> = new Map();

//     for (let flight of flights) {
//         const [from, to, price] = flight;

//         adjList.set(from, [...(adjList.get(from) ?? []), [to, price]]);
//     };

//     let price: number = Infinity;

//     const checkMin = (currDest: number, remainingK: number, currPrice: number) => {
//         if(remainingK < 0) return;

//         if(currDest === dst) {
//             price = currPrice;
//         }

//         for (let nextDest of (adjList.get(currDest) ?? [])) {
//             const newPrice: number = currPrice + nextDest[1];

//             if(newPrice > price) continue;

//             checkMin(nextDest[0], remainingK - 1, newPrice);
//         }
//     }

//     checkMin(src, k + 1, 0);

//     return price === Infinity ? -1 : price;
// };

//DJISTRA's ALGORITHM

const findCheapestPrice = function (n, flights, src, dst, K) {
	const adjacencyList = new Map();

	for (let [start, end, cost] of flights) {
		if (adjacencyList.has(start)) adjacencyList.get(start).push([end, cost]);
		else adjacencyList.set(start, [[end, cost]]);
	}

	const queue = new MinPriorityQueue({
		compare: (a, b) => a[0] > b[0],
	});

	queue.enqueue([0, src, K + 1]);
	const visited = new Map();

	while (queue.size()) {
		const [cost, city, stops] = queue.dequeue();
		visited.set(city, stops);

		if (city === dst) return cost;
		if (stops <= 0 || !adjacencyList.has(city)) continue;
		for (let [nextCity, nextCost] of adjacencyList.get(city)) {
			if (visited.has(nextCity) && visited.get(nextCity) >= stops - 1) continue;
			queue.enqueue([cost + nextCost, nextCity, stops - 1]);
		}
	}

	return -1;
};
