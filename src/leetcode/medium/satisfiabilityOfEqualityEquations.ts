/**
    * desc: You are given an array of strings equations that represent relationships between variables where each string equations[i] is of length 4 and takes one of two different forms: "xi==yi" or "xi!=yi".Here, xi and yi are lowercase letters (not necessarily different) that represent one-letter variable names.

    Return true if it is possible to assign integers to variable names so as to satisfy all the given equations, or false otherwise.

    Example 1: =>
    Input: equations = ["a==b","b!=a"]
    Output: false
    Explanation: If we assign say, a = 1 and b = 1, then the first equation is satisfied, but not the second.
    There is no way to assign the variables to satisfy both equations.
    
    Example 2: =>
    Input: equations = ["b==a","a==b"]
    Output: true
    Explanation: We could assign a = 1 and b = 1 to satisfy both equations.
    
    Constraints: =>
    1 <= equations.length <= 500
    equations[i].length == 4
    equations[i][0] is a lowercase letter.
    equations[i][1] is either '=' or '!'.
    equations[i][2] is '='.
    equations[i][3] is a lowercase letter.
 */

/**
 *
 * @param equations string[]
 * @returns boolean
 */
const equationsPossible = (equations: string[]): boolean => {
	const parent: number[] = Array(26)
		.fill(0)
		.map((_, idx) => idx);

	const charAt = (char: string): number =>
		char.charCodeAt(0) - 'a'.charCodeAt(0);

	const notEquals: number[][] = [];

	const find = (element: number): number => {
		if (element === parent[element]) return element;

		return (parent[element] = find(parent[element]));
	};

	const union = (elementX: number, elementY: number) => {
		let x: number = find(elementX);
		let y: number = find(elementY);

		if (x !== y) parent[x] = y;
	};

	for (let equation of equations) {
		let comparison: string = equation.slice(1, 3);
		let x: number = charAt(equation[0]);
		let y: number = charAt(equation[3]);

		if (comparison === '==') {
			union(x, y);
		} else {
			notEquals.push([x, y]);
		}
	}

	for (let [x, y] of notEquals) {
		if (find(x) === find(y)) return false;
	}

	return true;
};
