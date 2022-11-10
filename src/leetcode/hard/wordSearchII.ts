/**========================================================= WITHOUT TRIES ====================================================== */
/**
 *
 * @param row number
 * @param column number
 * @returns number[][]
 */
const getNextSteps = (row: number, column: number): number[][] => {
	return [
		[row - 1, column],
		[row, column + 1],
		[row + 1, column],
		[row, column - 1],
	];
};

/**
 *
 * @param board string[][]
 * @param words string[]
 * @returns string[]
 */
const findWords = (board: string[][], words: string[]): string[] => {
	let result: string[] = [];
	const startWords: Map<string, Set<string>> = new Map();
	const rowLength: number = board.length;
	const columnLength: number = board[0].length;

	/**
	 *
	 * @param index number
	 * @param wordToForm string
	 * @param row number
	 * @param column number
	 * @returns boolean
	 */
	const isWordFormable = (
		index: number,
		wordToForm: string,
		row: number,
		column: number
	): boolean => {
		if (row < 0 || row >= rowLength || column < 0 || column >= columnLength) {
			return false;
		}

		if (board[row][column] === wordToForm[index]) {
			if (index === wordToForm.length - 1) {
				return true;
			} else if (index < wordToForm.length - 1) {
				let [top, right, bottom, left] = getNextSteps(row, column);
				let origString: string = board[row][column];

				board[row][column] = '.';

				let wordFromTop: boolean = isWordFormable(
					index + 1,
					wordToForm,
					top[0],
					top[1]
				);
				let wordFromRight: boolean = isWordFormable(
					index + 1,
					wordToForm,
					right[0],
					right[1]
				);
				let wordFromBottom: boolean = isWordFormable(
					index + 1,
					wordToForm,
					bottom[0],
					bottom[1]
				);
				let wordFromLeft: boolean = isWordFormable(
					index + 1,
					wordToForm,
					left[0],
					left[1]
				);

				board[row][column] = origString;

				return wordFromTop || wordFromRight || wordFromBottom || wordFromLeft;
			}
		} else {
			return false;
		}

		return false;
	};

	for (let word of words) {
		let wordsStarting: Set<string> = startWords.get(word[0]) ?? new Set();
		wordsStarting.add(word);
		startWords.set(word[0], wordsStarting);
	}

	for (let row = 0; row < rowLength; row++) {
		for (let column = 0; column < columnLength; column++) {
			if (startWords.has(board[row][column])) {
				let wordsStarting = startWords.get(board[row][column])!;
				for (let word of wordsStarting.values()) {
					if (isWordFormable(0, word, row, column)) {
						result.push(word);
						wordsStarting.delete(word);
					}
				}
			}
		}
	}

	return result;
};
/**========================================================= WITHOUT TRIES ====================================================== */

/**========================================================= WITH TRIES ====================================================== */

// interface Trie {
// 	count: number;
// 	end?: string;
// 	[x: string]: Trie;
// }

const buildTrie = (words: string[]) => {
	const trie: any = {};

	for (let word of words) {
		let currentNode = trie;

		for (let char of word) {
			currentNode[char] = currentNode[char] ?? {};
			currentNode[char].count = currentNode[char].count + 1 ?? 1;
			currentNode = currentNode[char];
		}

		currentNode.end = word;
	}

	return trie;
};

const findWordsTrie = (board: string[][], words: string[]): string[] => {
	let result: string[] = [];
	const rowLength: number = board.length;
	const columnLength: number = board[0].length;
	const trie = buildTrie(words);

	const findAndPushWord = (trie, row: number, column: number): boolean => {
		if (row < 0 || row >= rowLength || column < 0 || column >= columnLength) {
			return false;
		}

		let origString: string = board[row][column];
        
		if (!trie[origString]) return false;

		if (trie[origString].end) {
			result.push(trie[origString].end);
			trie[origString].end = null;
		}

		let [top, right, bottom, left] = getNextSteps(row, column);

		board[row][column] = '.';

		findAndPushWord(trie[origString], top[0], top[1]);
		findAndPushWord(trie[origString], right[0], right[1]);
		findAndPushWord(trie[origString], bottom[0], bottom[1]);
		findAndPushWord(trie[origString], left[0], left[1]);

		board[row][column] = origString;

		return true;
	};

	for (let row = 0; row < rowLength; row++) {
		for (let column = 0; column < columnLength; column++) {
			if (trie[board[row][column]]) {
				findAndPushWord(trie, row, column);
			}
		}
	}

	return result;
};

/**========================================================= WITH TRIES ====================================================== */
