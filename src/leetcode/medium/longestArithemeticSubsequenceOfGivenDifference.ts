/**
 * desc: Given an integer array arr and an integer difference, return the length of the longest subsequence in arr which is an arithmetic sequence such that the difference between adjacent elements in the subsequence equals difference.
 *
 * A subsequence is a sequence that can be derived from arr by deleting some or no elements without changing the order of the remaining elements.
 *
 * Example 1: =>
 * Input: arr = [1,2,3,4], difference = 1
 * Output: 4
 * Explanation: The longest arithmetic subsequence is [1,2,3,4].
 *
 * Example 2: =>
 * Input: arr = [1,3,5,7], difference = 1
 * Output: 1
 * Explanation: The longest arithmetic subsequence is any single element.
 *
 * Example 3: =>
 * Input: arr = [1,5,7,8,5,3,4,2,1], difference = -2
 * Output: 4
 * Explanation: The longest arithmetic subsequence is [7,5,3,1].
 *
 * Constraints: =>
 * 1 <= arr.length <= 105
 * -104 <= arr[i], difference <= 104
 */


/**
 *
 * @param arr
 * @param difference
 * @returns number
 */
const longestSubsequenceTLE = (arr: number[], difference: number): number => {
    const hash: Record<string, number> = {};

    const dp = (index: number, lastIndex:number): number => {
        if(index === arr.length) return 0;

        const str: string = `${index}:${lastIndex}`;

        if(hash[str]) return hash[str];

        let largestSub: number = 0;

        let largestTake: number = 0;

        // take
        if(lastIndex === -1 || arr[index] - arr[lastIndex] === difference) {
            largestTake = 1 + dp(index + 1, index);
        }

        // don't take
        const largestNoTake: number = dp(index + 1, lastIndex);

        largestSub = Math.max(largestTake, largestNoTake);
        return hash[str] = largestSub;
    }

    return dp(0, -1);
};

/**
 *
 * @param arr
 * @param difference
 * @returns number
 */
const longestSubsequence = (arr: number[], difference: number): number => {
    let max: number = 0;

    const hash: Record<number, number> = {};

    for(let i = 0; i < arr.length; i++) {
        if(hash[arr[i]] === undefined) {
            hash[arr[i] + difference] = 1;
        } else {
            let lastStuff = hash[arr[i]];
            hash[arr[i] + difference] = lastStuff + 1;
        }

        max = Math.max(max, hash[arr[i] + difference]);
    }

    return max;
};