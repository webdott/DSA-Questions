/*
    desc: Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.

    Return the sorted string. If there are multiple answers, return any of them.

    Example 1: =>
    Input: s = "tree"
    Output: "eert"
    Explanation: 'e' appears twice while 'r' and 't' both appear once.
    So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
    
    Example 2: =>
    Input: s = "cccaaa"
    Output: "aaaccc"
    Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
    Note that "cacaca" is incorrect, as the same characters must be together.
    
    Example 3: =>
    Input: s = "Aabb"
    Output: "bbAa"
    Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
    Note that 'A' and 'a' are treated as two different characters.
    

    Constraints: =>
    1 <= s.length <= 5 * 105
    s consists of uppercase and lowercase English letters and digits.
*/

const frequencySort = (s: string): string => {
	const hashMap: { [x: string]: number } = {};
	let sortedString: string = '';

    // push each character in string and number of occurence to hashTable
	for (let char of s) {
		if (hashMap[char]) {
			hashMap[char] += 1;
		} else {
			hashMap[char] = 1;
		}
	}

    // sort table in terms of highest occurence
	const sortedArr: [string, number][] = [...Object.entries(hashMap)];
	sortedArr.sort((a, b) => b[1] - a[1]);

    // then join string from highest occurence to lowest
	for (let map of sortedArr) {
		sortedString += map[0].repeat(map[1]);
	}

	return sortedString;
};
