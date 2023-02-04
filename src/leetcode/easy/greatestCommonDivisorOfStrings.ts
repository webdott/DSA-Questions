/**
    * desc: For two strings s and t, we say "t divides s" if and only if s = t + ... + t (i.e., t is concatenated with itself one or more times).

    Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

    Example 1: =>
    Input: str1 = "ABCABC", str2 = "ABC"
    Output: "ABC"
    
    Example 2: =>
    Input: str1 = "ABABAB", str2 = "ABAB"
    Output: "AB"
    
    Example 3: =>
    Input: str1 = "LEET", str2 = "CODE"
    Output: ""

    Constraints: =>
    1 <= str1.length, str2.length <= 1000
    str1 and str2 consist of English uppercase letters.
 */

/**
 *
 * @param str1 string
 * @param str2 string
 * @returns string
 */
const gcdOfStrings = (str1: string, str2: string): string => {
	let str1Store: string = '';

	for (let i = 0; i < Math.max(str1.length, str2.length); i++) {
		if (str1[i] && str2[i]) {
			if (str1[i] !== str2[i]) {
				return '';
			} else {
				str1Store += str1[i];
				continue;
			}
		}

		if (str1[i] && str1[i % str1Store.length] !== str1[i]) {
			return '';
		}

		if (str2[i] && str2[i % str1Store.length] !== str2[i]) {
			return '';
		}
	}

	const gcd = (a: number, b: number) => {
		if (b === 0) return a;

		return gcd(b, a % b);
	};

	return str1Store.substring(0, gcd(str1.length, str2.length));
};
