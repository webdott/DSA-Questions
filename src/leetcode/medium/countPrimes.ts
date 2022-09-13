/**
    * desc: Given an integer n, return the number of prime numbers that are strictly less than n.
     
    Example 1: =>
    Input: n = 10
    Output: 4
    Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
    
    Example 2: =>
    Input: n = 0
    Output: 0
    
    Example 3: =>
    Input: n = 1
    Output: 0
    
    Constraints: =>
    0 <= n <= 5 * 106
 */

const countPrimes = (n: number): number => {
	if (n < 2) return 0;

	let count = 0;

	const isPrime = (num) => {
		for (let i = 2, s = Math.sqrt(num); i <= s; i++)
			if (num % i === 0) return false;
		return num > 1;
	};

	for (let j = 2; j < n; j++) {
		if (isPrime(j)) count += 1;
	}

	return count;
};
