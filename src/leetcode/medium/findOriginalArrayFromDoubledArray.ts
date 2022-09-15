const findOriginalArray = (changed: number[]): number[] => {
	if (changed.length % 2 !== 0) return [];

	const hashTable: Map<number, number> = new Map();
	const result: number[] = [];

	// sort array to be sure we are least starting from the smallest number
	changed.sort((a, b) => a - b);

	// add each value with occurence to hashTable
	for (let num of changed) {
		hashTable.set(num, (hashTable.get(num) ?? 0) + 1);
	}

	for (let num of changed) {
		// if no elements are present in the array, we've exhausted alll items so return
		if (hashTable.size === 0) break;

		// check first if double the element is present in the hashTable, then remove both elements from hashTable and add num to result. If not, check for the number / 2, still not present, return [];
		if (hashTable.has(num)) {
			let currNum: number = hashTable.get(num)!;

			if (hashTable.has(num * 2)) {
				let doubleNum: number = hashTable.get(num * 2)!;
				currNum > 1 ? hashTable.set(num, currNum - 1) : hashTable.delete(num);
				doubleNum = hashTable.get(num * 2)!;
				doubleNum > 1
					? hashTable.set(num * 2, doubleNum - 1)
					: hashTable.delete(num * 2);
				result.push(num);
			} else if (hashTable.has(num / 2)) {
				let origNum: number = hashTable.get(num / 2)!;
				currNum > 1 ? hashTable.set(num, currNum - 1) : hashTable.delete(num);
				origNum = hashTable.get(num / 2)!;
				origNum > 1
					? hashTable.set(num / 2, origNum - 1)
					: hashTable.delete(num / 2);
				result.push(num / 2);
			} else {
				return [];
			}
		}
	}

	return result;
};
