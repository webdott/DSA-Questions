/**
    * desc: Given a rectangular pizza represented as a rows x cols matrix containing the following characters: 'A' (an apple) and '.' (empty cell) and given the integer k. You have to cut the pizza into k pieces using k-1 cuts. 

    For each cut you choose the direction: vertical or horizontal, then you choose a cut position at the cell boundary and cut the pizza into two pieces. If you cut the pizza vertically, give the left part of the pizza to a person. If you cut the pizza horizontally, give the upper part of the pizza to a person. Give the last piece of pizza to the last person.

    Return the number of ways of cutting the pizza such that each piece contains at least one apple. Since the answer can be a huge number, return this modulo 10^9 + 7.
    

    Example 1: =>
    Input: pizza = ["A..","AAA","..."], k = 3
    Output: 3 
    Explanation: The figure above shows the three ways to cut the pizza. Note that pieces must contain at least one apple.
    
    Example 2: =>
    Input: pizza = ["A..","AA.","..."], k = 3
    Output: 1
    
    Example 3: =>
    Input: pizza = ["A..","A..","..."], k = 1
    Output: 1
    
    Constraints: =>
    1 <= rows, cols <= 50
    rows == pizza.length
    cols == pizza[i].length
    1 <= k <= 10
    pizza consists of characters 'A' and '.' only.
 */

/**
 *
 * @param pizza string
 * @param k number
 * @returns number
 */
const ways = (pizza: string[], k: number): number => {
	let formattedPizza: string[][] = pizza.map((row) => row.split(''));

	const hasApple = (
		startRow: number,
		lastRow: number,
		startCol: number,
		lastCol: number
	): boolean => {
		for (let i = startRow; i <= lastRow; i++) {
			for (let j = startCol; j <= lastCol; j++) {
				if (formattedPizza[i][j] === 'A') return true;
			}
		}

		return false;
	};

	const map: Record<string, number> = {};

	const recur = (
		startRow: number,
		lastRow: number,
		startCol: number,
		lastCol: number,
		currK: number
	): number => {
		let key: string = `${startRow}-${lastRow}-${startCol}-${lastCol}-${currK}`;

		if (map[key] !== undefined) return map[key];

		let numWays: number = 0;

		if (!hasApple(startRow, lastRow, startCol, lastCol)) {
			return (map[key] = 0);
		}

		if (currK === 0) return (map[key] = 1);

		// decide to cut horizontally,
		for (let i = startRow; i < lastRow; i++) {
			if (hasApple(startRow, i, startCol, lastCol))
				numWays += recur(i + 1, lastRow, startCol, lastCol, currK - 1);
		}

		// decide to cut vertically
		for (let i = startCol; i < lastCol; i++) {
			if (hasApple(startRow, lastRow, startCol, i))
				numWays += recur(startRow, lastRow, i + 1, lastCol, currK - 1);
		}

		return (map[key] = numWays);
	};

	return (
		recur(
			0,
			formattedPizza.length - 1,
			0,
			formattedPizza[0].length - 1,
			k - 1
		) %
		(10 ** 9 + 7)
	);
};
