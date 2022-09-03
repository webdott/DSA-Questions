/**
   * You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

	You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

	Example 1: =>
	Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
	Output: [[7,4,1],[8,5,2],[9,6,3]]
	
	Example 2: =>
	Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
	Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
	
	Constraints: =>
	n == matrix.length == matrix[i].length
	1 <= n <= 20
	-1000 <= matrix[i][j] <= 1000
 */

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = (matrix: number[][]): number[][] => {
	const rows: number = matrix.length;
	const columns: number = matrix[0].length;
	const set = new Map();

	// swap the index of each coordinate, subtract the column index from length of array + 1; and store it in the map
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			set.set(`${j}-${columns - 1 - i}`, matrix[i][j]);
		}
	}

	// get each index from the map and assign it to the matrix;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			matrix[i][j] = set.get(`${i}-${j}`);
		}
	}

	return matrix;
};
