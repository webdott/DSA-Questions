/*
    desc: Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

    Example 1: =>
    Input: s = "leetcode"
    Output: 0

    Example 2: =>
    Input: s = "loveleetcode"
    Output: 2

    Example 3: =>
    Input: s = "aabb"
    Output: -1
    
    Constraints: =>
    1 <= s.length <= 105
    s consists of only lowercase English letters.
*/

const firstUniqChar = (s: string): number => {
	let nonRepeatingIndex: number = -1;
	const hashTable = new Map();

	for (let i = 0; i < s.length; i++) {
		if (hashTable.has(s[i])) {
			hashTable.set(s[i], { occ: hashTable.get(s[i]).occ + 1, index: i });
		} else {
			hashTable.set(s[i], { occ: 1, index: i });
		}
	}

	for (let [key, value] of hashTable) {
		if (value.occ === 1) {
			nonRepeatingIndex = value.index;
			break;
		}
	}

	return nonRepeatingIndex;
};
