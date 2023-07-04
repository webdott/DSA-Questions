/**
 * desc: Given an integer array nums where every element appears three times except for one, which appears exactly once. Find the single element and return it.
 *
 * You must implement a solution with a linear runtime complexity and use only constant extra space.
 *
 * Example 1: =>
 * Input: nums = [2,2,3,2]
 * Output: 3
 *
 * Example 2: =>
 * Input: nums = [0,1,0,1,0,1,99]
 * Output: 99
 *
 * Constraints: =>
 * 1 <= nums.length <= 3 * 104
 * -231 <= nums[i] <= 231 - 1
 * Each element in nums appears exactly three times except for one element which appears once.
 */

/**
 *
 * @param nums
 * @returns number
 */
const singleNumber = (nums: number[]): number => {
    let bit: number = 0;

    for (let i = 0; i <= 31; i++) {
        let sumOfOnes: number = 0;

        for (let num of nums) {
            sumOfOnes += ((num >> i) & 1);
        }

        let pos: number = sumOfOnes %= 3;

        bit |= pos << i;
    }

    return bit;
};