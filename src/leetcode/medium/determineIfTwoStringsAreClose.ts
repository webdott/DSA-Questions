/**
    * desc: Two strings are considered close if you can attain one from the other using the following operations:

    Operation 1: Swap any two existing characters.
    For example, abcde -> aecdb
    Operation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.
    For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn into a's)
    You can use the operations on either string as many times as necessary.

    Given two strings, word1 and word2, return true if word1 and word2 are close, and false otherwise.

    Example 1: =>
    Input: word1 = "abc", word2 = "bca"
    Output: true
    Explanation: You can attain word2 from word1 in 2 operations.
    Apply Operation 1: "abc" -> "acb"
    Apply Operation 1: "acb" -> "bca"
    
    Example 2: =>
    Input: word1 = "a", word2 = "aa"
    Output: false
    Explanation: It is impossible to attain word2 from word1, or vice versa, in any number of operations.
    
    Example 3: =>
    Input: word1 = "cabbba", word2 = "abbccc"
    Output: true
    Explanation: You can attain word2 from word1 in 3 operations.
    Apply Operation 1: "cabbba" -> "caabbb"
    Apply Operation 2: "caabbb" -> "baaccc"
    Apply Operation 2: "baaccc" -> "abbccc"
    
    Constraints: =>
    1 <= word1.length, word2.length <= 105
    word1 and word2 contain only lowercase English letters.
 */

/**
 *
 * @param word1 string
 * @param word2 string
 * @returns
 */
const closeStrings = (word1: string, word2: string): boolean => {
	if (word1.length !== word2.length) return false;

	const hash1: Map<string, number> = new Map();
	const hash2: Map<string, number> = new Map();

	word1 = word1
		.split('')
		.sort((a, b) => a.localeCompare(b))
		.join('');
	word2 = word2
		.split('')
		.sort((a, b) => a.localeCompare(b))
		.join('');

	for (let i = 0; i < word1.length; i++) {
		hash1.set(word1[i], (hash1.get(word1[i]) ?? 0) + 1);
		hash2.set(word2[i], (hash2.get(word2[i]) ?? 0) + 1);
	}

	const values1: number[] = [];
	const keys1: string[] = [];

	for (let [key, value] of hash1.entries()) {
		if (!hash2.has(key)) return false;
		keys1.push(key);
		values1.push(value);
	}

	const values2: number[] = [];
	const keys2: string[] = [];

	for (let [key, value] of hash2.entries()) {
		if (!hash1.has(key)) return false;
		keys2.push(key);
		values2.push(value);
	}

	return (
		keys1.join('') === keys2.join('') &&
		values1.sort((a, b) => a - b).join('') ===
			values2.sort((a, b) => a - b).join('')
	);
};
