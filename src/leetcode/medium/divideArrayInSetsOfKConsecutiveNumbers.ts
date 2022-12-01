/**
    * desc: Given an array of integers nums and a positive integer k, check whether it is possible to divide this array into sets of k consecutive numbers.

    Return true if it is possible. Otherwise, return false.

    Example 1: =>
    Input: nums = [1,2,3,3,4,4,5,6], k = 4
    Output: true
    Explanation: Array can be divided into [1,2,3,4] and [3,4,5,6].
    
    Example 2: =>
    Input: nums = [3,2,1,2,3,4,3,4,5,9,10,11], k = 3
    Output: true
    Explanation: Array can be divided into [1,2,3] , [2,3,4] , [3,4,5] and [9,10,11].
    
    Example 3: =>
    Input: nums = [1,2,3,4], k = 3
    Output: false
    Explanation: Each array should be divided in subarrays of size 3.
    
    Constraints: =>
    1 <= k <= nums.length <= 105
    1 <= nums[i] <= 109
 */


/**
 * 
 * @param nums number[]
 * @param k number
 * @returns boolean
 */
const isPossibleDivide = (nums: number[], k: number): boolean => {
    if(k === 1) return true;

    nums.sort((a, b) => a - b);

    const numbers: Map<number, number> = new Map();

    for (let num of nums) {
        numbers.set(num, (numbers.get(num) ?? 0) + 1);
    }

    let prevValue: number = 0;
    let currCount: number = 0;

    while(numbers.size) {
        for (let [key, value] of numbers.entries()) {
            if(prevValue === 0 || (prevValue > 0 && key === prevValue + 1)) {
                currCount += 1;
                value === 1 ? numbers.delete(key) : numbers.set(key, value - 1);
                prevValue = key;
            } else {
                return false
            }

            if(currCount === k) {
                prevValue = 0;
                currCount = 0;
                break;
            };
        }
    }

    return numbers.size === 0 && prevValue === 0;
};