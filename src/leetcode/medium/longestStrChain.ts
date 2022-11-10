/**
    * desc: You are given an array of words where each word consists of lowercase English letters.

    wordA is a predecessor of wordB if and only if we can insert exactly one letter anywhere in wordA without changing the order of the other characters to make it equal to wordB.

    For example, "abc" is a predecessor of "abac", while "cba" is not a predecessor of "bcad".
    A word chain is a sequence of words [word1, word2, ..., wordk] with k >= 1, where word1 is a predecessor of word2, word2 is a predecessor of word3, and so on. A single word is trivially a word chain with k == 1.

    Return the length of the longest possible word chain with words chosen from the given list of words.

    Example 1: =>
    Input: words = ["a","b","ba","bca","bda","bdca"]
    Output: 4
    Explanation: One of the longest word chains is ["a","ba","bda","bdca"].
    
    Example 2: =>
    Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
    Output: 5
    Explanation: All the words can be put in a word chain ["xb", "xbc", "cxbc", "pcxbc", "pcxbcf"].
    
    Example 3: =>
    Input: words = ["abcd","dbqca"]
    Output: 1
    Explanation: The trivial word chain ["abcd"] is one of the longest word chains.
    ["abcd","dbqca"] is not a valid word chain because the ordering of the letters is changed.

    Constraints: =>
    1 <= words.length <= 1000
    1 <= words[i].length <= 16
    words[i] only consists of lowercase English letters.
 */

/**
 *
 * @param words string[]
 * @returns number
 */
const longestStrChain = (words: string[]): number => {
	let maxCount: number = 1;

	let store: Map<string, number> = new Map();
	words.sort((a, b) => a.length - b.length);

	// check for each word
	for (let word of words) {
		let max: number = 1;

		// remove each character of each word and look if the resulting word is stored in the map
		// if yes, calculate the max and set the word in the map to max.
		// also calculate the maxCount of everything.
		for (let i = 0; i < word.length; i++) {
			let front: string = word.substring(0, i);
			let back: string = word.substring(i + 1);

			let stringToCheck: string = front + back;

			if (store.has(stringToCheck)) {
				max = Math.max(max, store.get(stringToCheck)! + 1);
			}
		}

		store.set(word, max);

		maxCount = Math.max(maxCount, max);
	}

	return maxCount;
};
