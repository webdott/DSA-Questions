/**
    * desc: A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.

    For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses.
    Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.

    Example 1: =>
    Input: s = "25525511135"
    Output: ["255.255.11.135","255.255.111.35"]
    
    Example 2: =>
    Input: s = "0000"
    Output: ["0.0.0.0"]
    
    Example 3: =>
    Input: s = "101023"
    Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
    
    Constraints: =>
    1 <= s.length <= 20
    s consists of digits only.
 */

/**
 *
 * @param s string
 * @returns string[]
 */
const restoreIpAddresses = (s: string): string[] => {
	if (s.length < 4) {
		return [];
	}

	if (s.length === 4) {
		return [s.split('').join('.')];
	}

	const result: string[] = [];

	const helper = (currIndex: number, str: string, numDots: number) => {
		if (numDots > 3 || currIndex >= str.length) return;

		if (numDots === 3) {
			const restOfString: string = str.substring(currIndex);

			if (
				Number(restOfString) <= 255 &&
				((restOfString.length > 1 && restOfString[0] !== '0') ||
					restOfString.length === 1)
			)
				result.push(str);
		} else if (str[currIndex] === '0') {
			const newStr: string = `${str.substring(
				0,
				currIndex + 1
			)}.${str.substring(currIndex + 1)}`;

			helper(currIndex + 2, newStr, numDots + 1);
		} else {
			let currOctet: number = Number(str[currIndex]);

			while (currOctet <= 255) {
				const newStr: string = `${str.substring(
					0,
					currIndex + 1
				)}.${str.substring(currIndex + 1)}`;

				helper(currIndex + 2, newStr, numDots + 1);

				currIndex += 1;
				currOctet = currOctet * 10 + Number(str[currIndex]);
			}
		}
	};

	helper(0, s, 0);

	return result;
};
