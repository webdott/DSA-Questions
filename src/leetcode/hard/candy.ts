/**
    * desc: There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.

    You are giving candies to these children subjected to the following requirements:

    Each child must have at least one candy.
    Children with a higher rating get more candies than their neighbors.
    Return the minimum number of candies you need to have to distribute the candies to the children.

    Example 1: =>
    Input: ratings = [1,0,2]
    Output: 5
    Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.

    Example 2: =>
    Input: ratings = [1,2,2]
    Output: 4
    Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
    The third child gets 1 candy because it satisfies the above two conditions.
    
    Constraints: =>
    n == ratings.length
    1 <= n <= 2 * 104
    0 <= ratings[i] <= 2 * 104
 */

/**
 *
 * @param ratings number[]
 * @returns number
 */
const candy = (ratings: number[]): number => {
	// share a candy amongst each person first
	let result: number[] = Array(ratings.length).fill(1);

	// start from the second person and check the previous person's rating
	for (let i = 1; i < ratings.length; i++) {
		// we can leave just one candy if the current person's rating is the same as the previous person's rating
		if (ratings[i] === ratings[i - 1]) {
			continue;
		} else if (ratings[i] > ratings[i - 1]) {
			// if the current person's rating is greater than the previous person's rating, we can give one more candy than the previous person
			result[i] += result[i - 1];
		} else {
			/**
			 * if the current person's rating is less than the previous person's rating,
			 * we can leave the current person with one candy if the previous person has more than a candy
			 */

			/**
			 * if the previous person has just one candy,
			 * we need to give the current person one more candy than the previous person,
			 * and keep doing that until the previous person with higher rating has more candy than the other
			 */

			if (result[i - 1] === 1) {
				let backIdx: number = i - 1;
				let num: number = ratings[i];

				while (
					backIdx >= 0 &&
					ratings[backIdx] > num &&
					result[backIdx] <= result[backIdx + 1]
				) {
					result[backIdx] += 1;
					num = ratings[backIdx];
					backIdx -= 1;
				}
			}
		}
	}

    // calculate the total number of candy shared
	return result.reduce((acc, num) => acc + num, 0);
};
