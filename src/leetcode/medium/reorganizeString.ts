/**
    * desc: Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.

    Return any possible rearrangement of s or return "" if not possible.

    Example 1: =>
    Input: s = "aab"
    Output: "aba"
    
    Example 2: =>
    Input: s = "aaab"
    Output: ""

    Constraints: =>
    1 <= s.length <= 500
    s consists of lowercase English letters.
 */

/**
 *
 * @param s string
 * @returns string
 */
const reorganizeString = (s: string): string => {
	const map: Record<string, number> = {};

	// create a hash table to keep count of all character occurences in the string
	for (let str of s) {
		if (!map[str]) map[str] = 0;

		map[str] += 1;
	}

	// from "@datastructures-js/priority-queue"
	// @ts-ignore
	const maxHeap = new MaxPriorityQueue();

	let result: string = '';

	// push all the characters and their occurences to a priority queue in order to get the largest occurences at each point
	for (let [key, value] of Object.entries(map)) {
		maxHeap.enqueue(key, value);
	}

	while (maxHeap.size() > 1) {
		// we get the two largest occuring characters and append them side by side to result
		const { element: firstChar, priority: firstOcc } = maxHeap.dequeue();
		const { element: secondChar, priority: secondOcc } = maxHeap.dequeue();

		result +=
			firstChar === result[result.length - 1]
				? secondChar + firstChar
				: firstChar + secondChar;

		// we do not want to push them back into the priority queue once we have exhausted any character
		if (firstOcc > 1) maxHeap.enqueue(firstChar, firstOcc - 1);
		if (secondOcc > 1) maxHeap.enqueue(secondChar, secondOcc - 1);
	}

	/** if we have just one character left in our priority queue, we have to check if that character occurs more than once, or it is the same with the last character in our result.
     
    *If it does, there is no way we can reorganize result string, so we return "". Else, we append the character to result and return result. 
    */
	if (maxHeap.size() > 0) {
		const { element: firstChar, priority: firstOcc } = maxHeap.dequeue();

		if (firstOcc > 1 || firstChar === result[result.length - 1]) return '';

		return result + firstChar;
	}

	// if we have exhausted all characters in our priority queue, we return result.
	return result;
};
