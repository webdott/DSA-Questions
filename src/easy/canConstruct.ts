/*
    desc: Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

    Each letter in magazine can only be used once in ransomNote.

    Example 1: =>
    Input: ransomNote = "a", magazine = "b"
    Output: false

    Example 2: =>
    Input: ransomNote = "aa", magazine = "ab"
    Output: false

    Example 3: =>
    Input: ransomNote = "aa", magazine = "aab"
    Output: true
    

    Constraints: =>
    1 <= ransomNote.length, magazine.length <= 105
    ransomNote and magazine consist of lowercase English letters.
*/

const canConstruct = (ransomNote: string, magazine: string): boolean => {
	const hashTable: Map<string, number> = new Map();
	let left: number = ransomNote.length;

	for (let char of magazine) {
		if (hashTable.has(char)) {
			hashTable.set(char, hashTable.get(char) + 1);
		} else {
			hashTable.set(char, 1);
		}
	}

	for (let i = ransomNote.length - 1; i >= 0; i--) {
		if (hashTable.has(ransomNote[i])) {
			left -= 1;
			if (hashTable.get(ransomNote[i]) > 1) {
				hashTable.set(ransomNote[i], hashTable.get(ransomNote[i]) - 1);
			} else {
				hashTable.delete(ransomNote[i]);
			}
		} else {
			return false;
		}
	}

	return Boolean(left === 0);
};
