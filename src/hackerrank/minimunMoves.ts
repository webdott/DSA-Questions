/**
 * desc: There are two arrays of integers, arr1 and arr2. One move is defined as an increment or decrement of one element in an array. Determine the minimum number of moves to match arr with ar2. No reordering of the digits is allowed.
 *  Example
    arr1 = [123, 543)
    arr2 = (321, 279)
    • Match arr1(0]=123 with arr2(0]-321.
    • Increment 1 twice to get 3 (2 moves)
    • Decrement 3 twice to get 1 (2 moves).
    • 4 moves are needed to match 123 with 321.
    • Match arr1(1]-543 with arr2[1]=279.
    • Decrement 5 three times to get 2 (3 moves)
    • Increment 4 three times to get 7 (3 moves)
    • Increment 3 six times to get 9 (6 moves).
    • 12 moves are needed to match 543 with 279.
    • 16 total moves are needed to match the arrays arr1 and arr2.
   
    Function Description
    Complete the function minimumMoves in the editor below.
    minimumMoves has the following parameter(s): int arrlin): array to modify int arr2(n): array to match
 */

/**
 * 
 * @param arr1: number[]
 * @param arr2 number[]
 * @returns number
 */
const minimumMoves = (arr1: number[], arr2: number[]): number => {
	let moves: number = 0;

	for (let i = 0; i < arr1.length; i++) {
		let numString1: string = arr1[i].toString();
		let numString2: string = arr2[i].toString();

		for (let j = 0; j < numString1.length; j++) {
			moves += Math.abs(parseInt(numString1[j]) - parseInt(numString2[j]));
		}
	}

	return moves;
};

console.log(minimumMoves([123, 543], [321, 279]));
