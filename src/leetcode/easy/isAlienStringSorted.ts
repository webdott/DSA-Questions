/**
     * desc: In an alien language, surprisingly, they also use English lowercase letters, but possibly in a different order. The order of the alphabet is some permutation of lowercase letters.

    Given a sequence of words written in the alien language, and the order of the alphabet, return true if and only if the given words are sorted lexicographically in this alien language.

    Example 1: =>
    Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
    Output: true
    Explanation: As 'h' comes before 'l' in this language, then the sequence is sorted.
    
    Example 2: =>
    Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
    Output: false
    Explanation: As 'd' comes after 'l' in this language, then words[0] > words[1], hence the sequence is unsorted.
    
    Example 3: =>
    Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
    Output: false
    Explanation: The first three characters "app" match, and the second string is shorter (in size.) According to lexicographical rules "apple" > "app", because 'l' > '∅', where '∅' is defined as the blank character which is less than any other character (More info).
    
    Constraints: =>
    1 <= words.length <= 100
    1 <= words[i].length <= 20
    order.length == 26
    All characters in words[i] and order are English lowercase letters.
 */

/**
 *
 * @param words string[]
 * @param order string
 * @returns boolean
 */
const isAlienSorted = (words: string[], order: string): boolean => {
	const orderMap: Map<string, number> = new Map();

	for (let i = 0; i < order.length; i++) {
		orderMap.set(order[i], i);
	}

	let wordToCompare: string = words[0];

	for (let i = 1; i < words.length; i++) {
		let status: boolean = false;

		for (let j = 0; j < words[i].length; j++) {
			const o1: number = orderMap.get(words[i][j])!;
			const o2: number = orderMap.get(wordToCompare[j])!;

			if (!wordToCompare[j]) break;
			if (o1 < o2) return false;

			if (o1 > o2) {
				status = true;
				break;
			}
		}

		if (!status && wordToCompare.length > words[i].length) {
			return false;
		}

		wordToCompare = words[i];
	}

	return true;
};
