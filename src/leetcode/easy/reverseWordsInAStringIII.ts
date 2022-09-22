/**
    * desc: Given a string s, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.

    Example 1: =>
    Input: s = "Let's take LeetCode contest"
    Output: "s'teL ekat edoCteeL tsetnoc"
    
    Example 2: =>
    Input: s = "God Ding"
    Output: "doG gniD"
    
    Constraints: =>
    1 <= s.length <= 5 * 104
    s contains printable ASCII characters.
    s does not contain any leading or trailing spaces.
    There is at least one word in s.
    All the words in s are separated by a single space.
 */

/**
 *
 * @param s string
 * @returns string
 */
const reverseWords = (s: string): string => {
	let str: string[] = s.split(' ');

	const resultArr = str.map((word) => {
		let wordArray = word.split('');
		let left: number = 0;
		let right: number = word.length - 1;

		while (left < right) {
			[wordArray[left], wordArray[right]] = [wordArray[right], wordArray[left]];

			left += 1;
			right -= 1;
		}

		return (word = wordArray.join(''));
	});

	return resultArr.join(' ');
};
