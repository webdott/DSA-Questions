/**
    * desc: You are given two positive integer arrays spells and potions, of length n and m respectively, where spells[i] represents the strength of the ith spell and potions[j] represents the strength of the jth potion.

    You are also given an integer success. A spell and potion pair is considered successful if the product of their strengths is at least success.

    Return an integer array pairs of length n where pairs[i] is the number of potions that will form a successful pair with the ith spell.

    Example 1: =>
    Input: spells = [5,1,3], potions = [1,2,3,4,5], success = 7
    Output: [4,0,3]
    Explanation:
    - 0th spell: 5 * [1,2,3,4,5] = [5,10,15,20,25]. 4 pairs are successful.
    - 1st spell: 1 * [1,2,3,4,5] = [1,2,3,4,5]. 0 pairs are successful.
    - 2nd spell: 3 * [1,2,3,4,5] = [3,6,9,12,15]. 3 pairs are successful.
    Thus, [4,0,3] is returned.
    
    Example 2: =>
    Input: spells = [3,1,2], potions = [8,5,8], success = 16
    Output: [2,0,2]
    Explanation:
    - 0th spell: 3 * [8,5,8] = [24,15,24]. 2 pairs are successful.
    - 1st spell: 1 * [8,5,8] = [8,5,8]. 0 pairs are successful. 
    - 2nd spell: 2 * [8,5,8] = [16,10,16]. 2 pairs are successful. 
    Thus, [2,0,2] is returned.
    
    Constraints: =>
    n == spells.length
    m == potions.length
    1 <= n, m <= 105
    1 <= spells[i], potions[i] <= 105
    1 <= success <= 1010
 */

/**
 *
 * @param spells number[]
 * @param potions number[]
 * @param success number
 * @returns number[]
 */
const successfulPairs = (
	spells: number[],
	potions: number[],
	success: number
): number[] => {
	// sort potions array
	potions.sort((a, b) => a - b);

	const result: number[] = [];

	const getNoOfPotions = (spell: number): number => {
		let leftPointer: number = 0;
		let rightPointer: number = potions.length;

		// since potion array is sorted, if the first can give us a success, no need searching for the rest, we return the length of all potions.
		if (potions[0] * spell >= success) return potions.length;

		// Likewise, if the last potion can't give us a success, no need searching for the rest, we return 0.
		if (potions[potions.length - 1] * spell < success) return 0;

		// continue searching for a potion where no potion before it returns a success.
		while (leftPointer <= rightPointer) {
			let mid: number = leftPointer + ~~((rightPointer - leftPointer) / 2);

			if (potions[mid] * spell < success) {
				leftPointer = mid + 1;
			} else {
				rightPointer = mid - 1;
			}
		}

		return potions.length - leftPointer;
	};

	// loop through each spell to get number of potions
	for (let spell of spells) {
		result.push(getNoOfPotions(spell));
	}

	return result;
};
