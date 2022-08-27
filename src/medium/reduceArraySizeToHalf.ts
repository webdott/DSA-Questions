/*
    desc: You are given an integer array arr. You can choose a set of integers and remove all the occurrences of these integers in the array.

    Return the minimum size of the set so that at least half of the integers of the array are removed.

    Example 1: =>
    Input: arr = [3,3,3,3,5,5,5,2,2,7]
    Output: 2
    Explanation: Choosing {3,7} will make the new array [5,5,5,2,2] which has size 5 (i.e equal to half of the size of the old array).
    Possible sets of size 2 are {3,5},{3,2},{5,2}.
    Choosing set {2,7} is not possible as it will make the new array [3,3,3,3,5,5,5] which has a size greater than half of the size of the old array.
    
    Example 2: =>
    Input: arr = [7,7,7,7,7,7]
    Output: 1
    Explanation: The only possible set you can choose is {7}. This will make the new array empty.
    
    Constraints: =>
    2 <= arr.length <= 105
    arr.length is even.
    1 <= arr[i] <= 105
*/

const minSetSize = (arr: number[]): number => {
	const hashTable: { [x: number]: number } = {};
	let minSetSize: number = 0;
	let acc: number = 0;

	// Push each number and it's number of occurence to the hashTable
	for (let num of arr) {
		if (hashTable[num]) {
			hashTable[num] = hashTable[num] + 1;
		} else {
			hashTable[num] = 1;
		}
	}

	// sort hashtable in order of highest occurence
	const hashArr: [string, number][] = [...Object.entries(hashTable)];
	hashArr.sort((a, b) => b[1] - a[1]);

	// check if subtracting a number's occurence would reduce size of the array to half. If yes, return minSetSize + 1; else add one to minSetSize, add num of occurence to the accumulator and move to next
	for (let i = 0; i < hashArr.length; i++) {
		if (arr.length - (acc + hashArr[i][1]) <= arr.length / 2) {
			return (minSetSize += 1);
		}

		minSetSize += 1;
		acc += hashArr[i][1];
	}

	return minSetSize;
};
