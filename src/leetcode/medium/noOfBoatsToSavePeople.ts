/**
    * desc: You are given an array people where people[i] is the weight of the ith person, and an infinite number of boats where each boat can carry a maximum weight of limit. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most limit.

    Return the minimum number of boats to carry every given person.

    Example 1: =>
    Input: people = [1,2], limit = 3
    Output: 1
    Explanation: 1 boat (1, 2)
    
    Example 2: =>
    Input: people = [3,2,2,1], limit = 3
    Output: 3
    Explanation: 3 boats (1, 2), (2) and (3)
    
    Example 3: =>
    Input: people = [3,5,3,4], limit = 5
    Output: 4
    Explanation: 4 boats (3), (3), (4), (5)
    
    Constraints: =>
    1 <= people.length <= 5 * 104
    1 <= people[i] <= limit <= 3 * 104
 */

/**
 *
 * @param people number[]
 * @param limit number
 * @returns number
 */
const numRescueBoats = (people: number[], limit: number): number => {
	people.sort((a, b) => a - b);

	let res: number = 0;

	while (people.length > 0) {
		const numToTakeWith: number = people.shift()!;
		let continuer: boolean = false;

		let left: number = 0;
		let right: number = people.length;

		while (left <= right) {
			let mid: number = left + ~~((right - left) / 2);

			if (people[mid] + numToTakeWith === limit) {
				res += 1;
				continuer = true;
				people.splice(mid, 1);
				break;
			} else if (people[mid] + numToTakeWith > limit) {
				right = mid - 1;
			} else {
				left = mid + 1;
			}
		}

		if (!continuer) {
			res += 1;
			right = right >= people.length ? people.length - 1 : right;

			if (people[right] + numToTakeWith < limit) {
				people.splice(right, 1);
			}
		}
	}

	return res;
};
