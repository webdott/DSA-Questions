/**
    * desc: You are given an array of strings words. Each element of words consists of two lowercase English letters.

    Create the longest possible palindrome by selecting some elements from words and concatenating them in any order. Each element can be selected at most once.

    Return the length of the longest palindrome that you can create. If it is impossible to create any palindrome, return 0.

    A palindrome is a string that reads the same forward and backward.

    Example 1: =>
    Input: words = ["lc","cl","gg"]
    Output: 6
    Explanation: One longest palindrome is "lc" + "gg" + "cl" = "lcggcl", of length 6.
    Note that "clgglc" is another longest palindrome that can be created.
    
    Example 2: =>
    Input: words = ["ab","ty","yt","lc","cl","ab"]
    Output: 8
    Explanation: One longest palindrome is "ty" + "lc" + "cl" + "yt" = "tylcclyt", of length 8.
    Note that "lcyttycl" is another longest palindrome that can be created.
    
    Example 3: =>
    Input: words = ["cc","ll","xx"]
    Output: 2
    Explanation: One longest palindrome is "cc", of length 2.
    Note that "ll" is another longest palindrome that can be created, and so is "xx".
    
    Constraints: =>
    1 <= words.length <= 105
    words[i].length == 2
    words[i] consists of lowercase English letters.
 */

/**
 *
 * @param words string[]
 * @returns number
 */
const longestPalindrome = (words: string[]): number => {
	const hashMap: Map<string, number> = new Map();
	const sameChar: Map<string, number> = new Map();
	const palindromeWord: Map<string, number> = new Map();

	for (let word of words) {
		if (!hashMap.has(word)) {
			if (word[0] === word[1]) {
				sameChar.set(word, (sameChar.get(word) ?? 0) + 1);
			} else if (
				!palindromeWord.has(word) &&
				!palindromeWord.has(word[1] + word[0])
			) {
				palindromeWord.set(word, (palindromeWord.get(word) ?? 0) + 1);
			}
		}

		hashMap.set(word, (hashMap.get(word) ?? 0) + 1);
	}

	let palindromeCount: number = 0;
	for (let word of palindromeWord.keys()) {
		palindromeCount +=
			Math.min(hashMap.get(word)!, hashMap.get(word[1] + word[0]) ?? 0) * 2;
	}

	let sameCount: number = 0;
	let middle: number = 0;

	for (let word of sameChar.keys()) {
		let count = hashMap.get(word)!;

		if (count % 2 === 1 && middle === 0) {
			middle = 1;
		}

		sameCount += Math.floor(count / 2);
	}

	sameCount *= 2;

	return (palindromeCount + sameCount + middle) * 2;
};
