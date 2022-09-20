/**
    * desc: Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

    Example 1: =>
    Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
    Output: 6
    Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
    
    Example 2: =>
    Input: height = [4,2,0,3,2,5]
    Output: 9

    Constraints: =>
    n == height.length
    1 <= n <= 2 * 104
    0 <= height[i] <= 105
 */

/**
 *
 * @param height number[];
 * @returns number
 */
const trap = (height: number[]): number => {
	let trappedWaterVolume: number = 0;
	let maxLeft: number = 0;
	let maxRight: number = 0;
	let maxLefts: number[] = [];
	let maxRights: number[] = [];

	// the goal is to find the minimum of the maximum heights to the left and right of each index
	// To get the volume of water it can trap, you subtract the height of the current index from the minimum calculated above.
	for (let i = 0; i < height.length; i++) {
		maxLeft = Math.max(height[i], maxLeft);
		maxRight = Math.max(height[height.length - (i + 1)], maxRight);

		maxLefts[i] = maxLeft;
		maxRights[height.length - (i + 1)] = maxRight;
	}

	for (let i = 0; i < height.length; i++) {
		trappedWaterVolume += Math.min(maxLefts[i], maxRights[i]) - height[i];
	}

	return trappedWaterVolume;
};