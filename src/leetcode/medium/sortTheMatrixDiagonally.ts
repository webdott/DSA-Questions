/**
    * desc: A matrix diagonal is a diagonal line of cells starting from some cell in either the topmost row or leftmost column and going in the bottom-right direction until reaching the matrix's end. For example, the matrix diagonal starting from mat[2][0], where mat is a 6 x 3 matrix, includes cells mat[2][0], mat[3][1], and mat[4][2].

    Given an m x n matrix mat of integers, sort each matrix diagonal in ascending order and return the resulting matrix.

    Example 1: =>
    Input: mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]
    Output: [[1,1,1,1],[1,2,2,2],[1,2,3,3]]
    
    Example 2: =>
    Input: mat = [[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]]
    Output: [[5,17,4,1,52,7],[11,11,25,45,8,69],[14,23,25,44,58,15],[22,27,31,36,50,66],[84,28,75,33,55,68]]

    Constraints: =>
    m == mat.length
    n == mat[i].length
    1 <= m, n <= 100
    1 <= mat[i][j] <= 100
*/

/**
 *
 *
 * @param mat matrix
 * @returns number[][]
 */

const diagonalSort = (mat: number[][]): number[][] => {
	const rows: number = mat.length;
	const columns: number = mat[0].length;

	// taking the topmost row
	for (let i = 0; i < columns; i++) {
		// initializing temp variables to push each element of diagonal element into an array
		let tempRow: number = 0;
		let tempCol: number = i;
		const arr: number[] = [];

		while (mat[tempRow]?.[tempCol]) {
			arr.push(mat[tempRow][tempCol]);
			tempRow++;
			tempCol++;
		}

		// sort the diagonal array in ascending order
		arr.sort((a, b) => a - b);

		// push the sorted array back into the diagonal indexes of the matrix
		for (let g = 0; g < arr.length; g++) {
			mat[g][i + g] = arr[g];
		}
	}

	// taking the leftmost column
	for (let j = 1; j < rows; j++) {
		// initializing temp variables to push each element of diagonal element into an array
		let tempRow: number = j;
		let tempCol: number = 0;
		const arr: number[] = [];

		while (mat[tempRow]?.[tempCol]) {
			arr.push(mat[tempRow][tempCol]);
			tempRow++;
			tempCol++;
		}

		// sort the diagonal array in ascending order
		arr.sort((a, b) => a - b);

		// push the sorted array back into the diagonal indexes of the matrix
		for (let g = 0; g < arr.length; g++) {
			mat[j + g][g] = arr[g];
		}
	}

	return mat;
};
