/**
    * desc: Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

    You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

    Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

    For the last line of text, it should be left-justified, and no extra space is inserted between words.

    Note: =>
    A word is defined as a character sequence consisting of non-space characters only.
    Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
    The input array words contains at least one word.
    
    Example 1: =>
    Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
    Output:
    [
    "This    is    an",
    "example  of text",
    "justification.  "
    ]
    
    Example 2: =>
    Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
    Output:
    [
    "What   must   be",
    "acknowledgment  ",
    "shall be        "
    ]
    Explanation: Note that the last line is "shall be    " instead of "shall     be", because the last line must be left-justified instead of fully-justified.
    Note that the second line is also left-justified because it contains only one word.
    
    Example 3: =>
    Input: words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], maxWidth = 20
    Output:
    [
    "Science  is  what we",
    "understand      well",
    "enough to explain to",
    "a  computer.  Art is",
    "everything  else  we",
    "do                  "
    ]
    

    Constraints: =>
    1 <= words.length <= 300
    1 <= words[i].length <= 20
    words[i] consists of only English letters and symbols.
    1 <= maxWidth <= 100
    words[i].length <= maxWidth
 */

/**
 *
 * @param words string[]
 * @param maxWidth number
 * @returns string[]
 */
const fullJustify = (words: string[], maxWidth: number): string[] => {
	const result: string[] = [];

	/**
        Initialize the current string to an empty string "".
        For each word, try adding the word to our current string with a space. 
            - If the joint string length is equal to the max width, we just appnd the string to result and reset the current string to empty string
            - If the joint string length is less than max width, make current string the joint string and move to the next word
            - Finally, If the joint string length is greater than max width, we remove the word from the joint string and calculate the total number of spaces we have to add by subtracting the current string from the max width and spread them evenly among the words we have. Any remainder of spaces left are shared started from the left.
    */

	let concacString: string = '';

	for (let i = 0; i < words.length; i++) {
		const word = words[i] ?? '';
		if (concacString !== '') concacString += ' ';

		if ((concacString + word).length > maxWidth) {
			concacString = concacString.trim();
			const breakDown: string[] = concacString.split(' ');
			const currNumOfSpaces: number =
				breakDown.length - 1 > 0 ? breakDown.length - 1 : 1;
			const spacesToAdd: number =
				maxWidth -
				(concacString.length -
					(breakDown.length - 1 > 0 ? currNumOfSpaces : 0));
			const spacesToShare: number = ~~(spacesToAdd / currNumOfSpaces);
			let remSpaces: number = spacesToAdd % currNumOfSpaces;

			for (let i = 0; i <= breakDown.length - 1; i++) {
				if (i === breakDown.length - 1 && breakDown.length > 1) continue;

				breakDown[i] += ' '.repeat(spacesToShare);
				if (remSpaces > 0) {
					breakDown[i] += ' ';
					remSpaces -= 1;
				}
			}

			result.push(breakDown.join(''));
			concacString = word;
		} else {
			concacString += word;

			if (concacString.length === maxWidth) {
				result.push(concacString);
				concacString = '';
			}
		}
	}

	if (concacString.length > 0 && concacString.length <= maxWidth) {
		result.push(concacString + ' '.repeat(maxWidth - concacString.length));
	}

	return result;
};
