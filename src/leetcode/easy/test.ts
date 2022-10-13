// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
	// write your code in JavaScript (Node.js 8.9.4)

	// [4, 2, 2, 5, 1, 5, 8]
	//  0  1  2  3  4  5  6

	// let smallestAvg = Infinity;
	// let startingPoint = -1;

	// for (let i = 0; i < A.length - 1; i++) {
	//     for (let j = i + 1; j < A.length; j++) {
	//         let arrayPortion = A.slice(i, j + 1);
	//         let sum = arrayPortion.reduce((prev, curr) => prev + curr);
	//         let avg = sum / (j - i + 1);

	//         if(avg < smallestAvg) {
	//             smallestAvg = avg;
	//             startingPoint = i;
	//         } else if (avg === smallestAvg && i < startingPoint) {
	//             startingPoint = i;
	//         }
	//     }
	// };

	// return startingPoint;

	// sort the array, but keep their indexes;
	// [4, 2, 2, 5, 1, 5, 8]
	//  0  1  2  3  4  5  6
	// [1, 2, 2, 4, 5, 5, 8]
	//  4  1  2  0  3  5  6

	let smallestAvg = Infinity;
	let startingPoint = -1;
	const modifiedA = A.map((val, idx) => [val, idx]);

	modifiedA.sort((a, b) => a[0] - b[0]);
	// [[1, 4], [2, 1], [2, 2], [4, 0], [5, 3], [5, 5], [8, 6]]

	for (let i = 0; i < modifiedA.length - 1; i++) {
		let incI = i + 1; // 2
		let count = 1; // 1
		let sum = modifiedA[i][0]; // 2

		while (
			incI < modifiedA.length &&
			modifiedA[incI][1] > modifiedA[incI - 1][1]
		) {
			sum += modifiedA[incI][0];
			count += 1;

			let avg = sum / count;

			if (avg < smallestAvg) {
				smallestAvg = avg;
				startingPoint = modifiedA[i][1];
			} else if (avg === smallestAvg && i < startingPoint) {
				startingPoint = modifiedA[i][1];
			}

			incI += 1;
		}
	}

	return startingPoint;
}
