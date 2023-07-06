/**
 * desc: Given an array of positive integers nums and a positive integer target, return the minimal length of a
 * subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.
 *
 * Example 1: =>
 * Input: target = 7, nums = [2,3,1,2,4,3]
 * Output: 2
 * Explanation: The subarray [4,3] has the minimal length under the problem constraint.
 *
 * Example 2: =>
 * Input: target = 4, nums = [1,4,4]
 * Output: 1
 *
 * Example 3: =>
 * Input: target = 11, nums = [1,1,1,1,1,1,1,1]
 * Output: 0
 *
 * Constraints: =>
 * 1 <= target <= 109
 * 1 <= nums.length <= 105
 * 1 <= nums[i] <= 104
 *
 * Follow up: If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log(n)).
 */

/**
 * @param target
 * @param nums
 */
const minSubArrayLen = (target: number, nums: number[]): number => {
    let leastSub: number = Infinity;
    let currSub: number = 0;
    let start: number = 0;
    let currSum: number = 0;

    for (let i = 0; i < nums.length; i++) {
        currSum += nums[i];

        while(currSum - nums[start] >= target) {
            currSum -= nums[start];
            start += 1;
        }

        if(currSum >= target) {
            currSub = i - start + 1;
            leastSub = Math.min(leastSub, currSub);
        }
    }

    return leastSub === Infinity ? 0 : leastSub;
};