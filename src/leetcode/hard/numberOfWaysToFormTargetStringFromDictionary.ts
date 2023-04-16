/**
    * desc:You are given a list of strings of the same length words and a string target.

    Your task is to form target using the given words under the following rules:

    target should be formed from left to right.
    To form the ith character (0-indexed) of target, you can choose the kth character of the jth string in words if target[i] = words[j][k].
    Once you use the kth character of the jth string of words, you can no longer use the xth character of any string in words where x <= k. In other words, all characters to the left of or at index k become unusuable for every string.
    Repeat the process until you form the string target.
    Notice that you can use multiple characters from the same string in words provided the conditions above are met.

    Return the number of ways to form target from words. Since the answer may be too large, return it modulo 109 + 7.

    Example 1: =>
    Input: words = ["acca","bbbb","caca"], target = "aba"
    Output: 6
    Explanation: There are 6 ways to form target.
    "aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("caca")
    "aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("caca")
    "aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("acca")
    "aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("acca")
    "aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("acca")
    "aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("caca")
    
    Example 2: =>
    Input: words = ["abba","baab"], target = "bab"
    Output: 4
    Explanation: There are 4 ways to form target.
    "bab" -> index 0 ("baab"), index 1 ("baab"), index 2 ("abba")
    "bab" -> index 0 ("baab"), index 1 ("baab"), index 3 ("baab")
    "bab" -> index 0 ("baab"), index 2 ("baab"), index 3 ("baab")
    "bab" -> index 1 ("abba"), index 2 ("baab"), index 3 ("baab")

    Constraints: =>
    1 <= words.length <= 1000
    1 <= words[i].length <= 1000
    All strings in words have the same length.
    1 <= target.length <= 1000
    words[i] and target contain only lowercase English letters.
 */

/**
 *
 * @param words string[]
 * @param target string
 * @returns number
 */
const numWays = (words: string[], target: string): number => {
	const MODULO: number = 10 ** 9 + 7;
	const freq: Map<string, number>[] = Array(words[0].length)
		.fill(0)
		.map((_) => new Map());

	for (let word of words) {
		for (let i = 0; i < word.length; i++) {
			const char = word[i];
			freq[i].set(char, (freq[i].get(char) ?? 0) + 1);
		}
	}

	const DP: number[][] = Array(words[0].length)
		.fill(0)
		.map((_) => []);

	/**
	 *
	 * @param wordIndex number
	 * @param targetIndex number
	 * @returns number
	 */
	const dp = (wordIndex: number, targetIndex: number): number => {
		if (wordIndex === words[0].length) return 0;

		if (DP[wordIndex][targetIndex] !== undefined)
			return DP[wordIndex][targetIndex];

		let answer: number = 0;

		for (
			let i = wordIndex;
			i < words[0].length - (target.length - targetIndex - 1);
			i++
		) {
			if (freq[i].has(target[targetIndex])) {
				answer +=
					freq[i].get(target[targetIndex])! *
					(targetIndex === target.length - 1 ? 1 : dp(i + 1, targetIndex + 1));
			}
		}

		return (DP[wordIndex][targetIndex] = answer % MODULO);
	};

	return dp(0, 0) % MODULO;
};
