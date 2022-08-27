/*
    desc: Given an array of integers arr, a lucky integer is an integer that has a frequency in the array equal to its value.

    Return the largest lucky integer in the array. If there is no lucky integer return -1.

    Example 1: =>
    Input: arr = [2,2,3,4]
    Output: 2
    Explanation: The only lucky number in the array is 2 because frequency[2] == 2.
    
    Example 2: =>
    Input: arr = [1,2,2,3,3,3]
    Output: 3
    Explanation: 1, 2 and 3 are all lucky numbers, return the largest of them.
    
    Example 3: =>
    Input: arr = [2,2,2,3,3]
    Output: -1
    Explanation: There are no lucky numbers in the array.
    

    Constraints: =>
    1 <= arr.length <= 500
    1 <= arr[i] <= 500
*/

const findLucky = (arr: number[]): number => {
	const hashTable = new Map();
	let luckyNumber: number = -1;

	for (let num of arr) {
		if (hashTable.has(num)) {
			hashTable.set(num, hashTable.get(num) + 1);
		} else {
			hashTable.set(num, 1);
		}
	}

	hashTable.forEach((value, key) => {
		if (key === value && value > luckyNumber) {
			luckyNumber = value;
		}
	});

	return luckyNumber;
};
