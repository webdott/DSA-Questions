/**
 *
 * @param str string
 * @returns boolean
 */
const checkPalindrome = (str: string): boolean => {
	let p1 = 0;
	let p2 = str.length - 1;

	while (p1 < p2) {
		if (str[p1] != str[p2]) {
			return false;
		}
		p1++;
		p2--;
	}
	return true;
};

/**
 *
 * @param words string[]
 * @returns number[][]
 */
const palindromePairs = (words: string[]): number[][] => {
	const hashTable: Map<string, number> = new Map();
	const palindromes: Set<number> = new Set();
	let emptyString: number = -1;
	let result: number[][] = [];

	for (let i = 0; i < words.length; i++) {
		if (words[i] == '') {
			emptyString = i;
			continue;
		}
		if (checkPalindrome(words[i])) {
			palindromes.add(i);
		}
		hashTable.set(words[i].split('').reverse().join(''), i);
	}

	for (let i = 0; i < words.length; i++) {
		for (let cut = 0; cut < words[i].length; cut++) {
			//Current String gives Left + Mid
			//We need to check whether Mid is Palindrome or not
			//If yes, we need to search for Right
			// Left = {0, cut-1}
			// Mid = {cut, words[i].length - 1}
			if (checkPalindrome(words[i].substring(cut))) {
				// we need right now
				const right = words[i].substring(0, cut);
				// no need to reverse here again. we already reversed in the map
				if (hashTable.has(right) && hashTable.get(right) != i) {
					result.push([i, hashTable.get(right)!]);
				}
			}

			//Current String gives  Mid +. Right
			//We need to check whether Mid is Palindrome or not
			//If yes, we need to search for Right
			// right = {cut, word[i].length - 1}
			// Mid = {0, cut -1}
			if (checkPalindrome(words[i].substring(0, cut))) {
				// we need left now
				const left = words[i].substring(cut);
				// no need to reverse here again. we already reversed in the map
				if (hashTable.has(left) && hashTable.get(left) != i) {
					result.push([hashTable.get(left)!, i]);
				}
			}
		}
	}

	// for words that are allready palindrome we can attach emptyString to the left and right to make a palindrome
	if (emptyString != -1) {
		palindromes.forEach((palindromIndex) => {
			result.push([palindromIndex, emptyString]);
			result.push([emptyString, palindromIndex]);
		});
	}

	return result;
};
