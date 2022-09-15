/**
    * desc: Given a string array words, return an array of all characters that show up in all strings within the words (including duplicates). You may return the answer in any order.

    Example 1: =>
    Input: words = ["bella","label","roller"]
    Output: ["e","l","l"]
    
    Example 2: =>
    Input: words = ["cool","lock","cook"]
    Output: ["c","o"]
    
    Constraints: =>
    1 <= words.length <= 100
    1 <= words[i].length <= 100
    words[i] consists of lowercase English letters.
 */

/**
 *
 * @param words string[]
 * @returns string[]
 */
const commonChars = (words: string[]): string[] => {
	let hashTable1: Map<string, number> = new Map();
	const result: string[] = [];

	for (let char of words[0]) {
		hashTable1.set(char, (hashTable1.get(char) ?? 0) + 1);
	}

	for (let i = 1; i < words.length; i++) {
		let hashTable2: Map<string, number> = new Map();

		for (let char of words[i]) {
			if (hashTable1.has(char)) {
				let noOfOcc: number = hashTable1.get(char)!;
				if ((hashTable2.get(char) ?? 0) < noOfOcc) {
					hashTable2.set(char, (hashTable2.get(char) ?? 0) + 1);
				}
			}
		}

		hashTable1 = hashTable2;
	}

	hashTable1.forEach((value, key) => {
		let noOfOcc: number = value;

		while (noOfOcc > 0) {
			result.push(key);
			noOfOcc -= 1;
		}
	});

	return result;
};
