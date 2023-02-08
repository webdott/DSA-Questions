/**
    * desc: You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

    Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:

    0 <= j <= nums[i] and
    i + j < n
    Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].

    Example 1: =>
    Input: nums = [2,3,1,1,4]
    Output: 2
    Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
    
    Example 2: =>
    Input: nums = [2,3,0,1,4]
    Output: 2
    
    Constraints: =>
    1 <= nums.length <= 104
    0 <= nums[i] <= 1000
 */

/**
 *
 * @param nums number[]
 * @returns number
 */
const jump = (nums: number[]): number => {
	const cache: Map<number, number> = new Map();

	const dfs = (currIndex: number) => {
		if (currIndex >= nums.length) return Infinity;

		if (currIndex === nums.length - 1) {
			return 0;
		}

		if (cache.has(currIndex)) return cache.get(currIndex);

		let currMinSteps: number = Infinity;

		for (let i = 1; i <= nums[currIndex]; i++) {
			const minStep: number = 1 + dfs(currIndex + i)!;
			currMinSteps = Math.min(currMinSteps, minStep);
		}

		cache.set(currIndex, currMinSteps);
		return currMinSteps;
	};

	return dfs(0)!;
};

const jumpGameOptimized = (nums: number[]): number => {
    const dp: number[] =  Array(nums.length).fill(-1);
    dp[nums.length - 1] = 0;

    for (let i = nums.length - 2; i >= 0; i--) {
        dp[i] = 1 + Math.min(...dp.slice(i+1, i+1+nums[i]));
    }

    return dp[0];
};