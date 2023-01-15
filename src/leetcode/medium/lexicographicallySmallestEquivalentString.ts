
/**
 * 
 * @param s1 string
 * @param s2 string
 * @param baseStr string
 * @returns string
 */
// Using union find
const smallestEquivalentString = (
	s1: string,
	s2: string,
	baseStr: string
): string => {
	const letters: Record<number, string> = {};

	for (let i = 0; i < 26; i++) {
		const letter: string = String.fromCharCode('a'.charCodeAt(0) + i);
		letters[letter] = letter;
	}

	const find = (char: string) => {
		if (char === letters[char]) {
			return char;
		} else {
			return (letters[char] = find(letters[char]));
		}
	};

	const combine = (charA: string, charB: string) => {
		const u: string = find(charA);
		const v: string = find(charB);


        // if the representative of u and v are not equal, means we combine them
		if (u !== v) {
            // we combine the bigger one to the smaller one to make sure the representative is the smallest one
			if (u < v) {
				letters[v] = u;
			} else {
				letters[u] = v;
			}
		}
	};

	for (let i = 0; i < s1.length; i++) {
		combine(s1[i], s2[i]);
	}

	let resultStr: string = '';

	for (let char of baseStr) {
		resultStr += find(char);
	}

	return resultStr;
};
