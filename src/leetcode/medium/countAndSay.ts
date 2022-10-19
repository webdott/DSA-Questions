/**
    * desc: The count-and-say sequence is a sequence of digit strings defined by the recursive formula:
    countAndSay(1) = "1"
    countAndSay(n) is the way you would "say" the digit string from countAndSay(n-1), which is then converted into a different digit string.
    To determine how you "say" a digit string, split it into the minimal number of substrings such that each substring contains exactly one unique digit. Then for each substring, say the number of digits, then say the digit. Finally, concatenate every said digit.

    For example, the saying and conversion for digit string "3322251":
    Given a positive integer n, return the nth term of the count-and-say sequence.
 */

/**
 *
 * @param n number
 * @returns string
 */
const countAndSay = (n: number): string => {
	let memo: Map<number, string> = new Map();

	const countAndSayHelper = (n: number): string => {
		if (memo.has(n)) return memo.get(n)!;

		if (n === 1) {
			memo.set(n, '1');
			return '1';
		} else {
			let stringToSay: string = countAndSayHelper(n - 1);
			let count = 1;
			let say: string = '';

			for (let i = 1; i < stringToSay.length; i++) {
				if (stringToSay[i] === stringToSay[i - 1]) {
					count += 1;
				} else {
					say += `${count.toString()}${stringToSay[i - 1]}`;
					count = 1;
				}
			}

			say += `${count.toString()}${stringToSay[stringToSay.length - 1]}`;
			memo.set(n, say);

			return say;
		}
	};

	return countAndSayHelper(n);
};
