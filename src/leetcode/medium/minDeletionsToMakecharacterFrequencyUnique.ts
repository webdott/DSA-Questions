/**
    * desc: A string s is called good if there are no two different characters in s that have the same frequency.

    Given a string s, return the minimum number of characters you need to delete to make s good.

    The frequency of a character in a string is the number of times it appears in the string. For example, in the string "aab", the frequency of 'a' is 2, while the frequency of 'b' is 1.

    Example 1: =>
    Input: s = "aab"
    Output: 0
    Explanation: s is already good.
    
    Example 2: =>
    Input: s = "aaabbbcc"
    Output: 2
    Explanation: You can delete two 'b's resulting in the good string "aaabcc".
    Another way it to delete one 'b' and one 'c' resulting in the good string "aaabbc".
    
    Example 3: =?
    Input: s = "ceabaacb"
    Output: 2
    Explanation: You can delete both 'c's resulting in the good string "eabaab".
    Note that we only care about characters that are still in the string at the end (i.e. frequency of 0 is ignored).
    
    Constraints: =>
    1 <= s.length <= 105
    s contains only lowercase English letters.
 */

/**
 *
 * @param s string
 * @returns number
 */
const minDeletions = (s: string): number => {
	const hashTable: Record<string, number> = {};

	for (let char of s) {
		if (hashTable[char] === undefined) hashTable[char] = 0;

		hashTable[char] += 1;
	}

	const set: Set<number> = new Set();

	let min: number = 0;

	for (let value of Object.values(hashTable)) {
		if (set.has(value)) {
			let val: number = value;

			while (set.has(val) && val > 0) {
				min += 1;
				val -= 1;
			}

			if (val > 0) set.add(val);
			continue;
		}

		set.add(value);
	}

	return min;
};
