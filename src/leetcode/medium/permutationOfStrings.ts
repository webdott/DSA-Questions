/**
    * desc: Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

    In other words, return true if one of s1's permutations is the substring of s2.

    Example 1: =>
    Input: s1 = "ab", s2 = "eidbaooo"
    Output: true
    Explanation: s2 contains one permutation of s1 ("ba").
    
    Example 2: =>
    Input: s1 = "ab", s2 = "eidboaoo"
    Output: false
    
    Constraints: =>
    1 <= s1.length, s2.length <= 104
    s1 and s2 consist of lowercase English letters.
 */

/**
 *
 * @param s1 string
 * @param s2 string
 * @returns boolean
 */
const checkInclusion = (s1: string, s2: string): boolean => {
	const setPerm: Map<string, number> = new Map();

	for (let str of s1) {
		setPerm.set(str, (setPerm.get(str) ?? 0) + 1);
	}

	for (let i = 0; i < s2.length; i++) {
		let j = i;
		let mapCopy = new Map(setPerm);

		while (mapCopy.has(s2[j])) {
			let val: number = mapCopy.get(s2[j])!;

			if (val === 1) {
				mapCopy.delete(s2[j]);
			} else {
				mapCopy.set(s2[j], val - 1);
			}

			j += 1;
		}

		if (mapCopy.size === 0) return true;
	}

	return false;
};
