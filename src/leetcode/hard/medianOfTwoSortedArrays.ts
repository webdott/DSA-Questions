/*
    desc: Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

    The overall run time complexity should be O(log (m+n)).

    Example 1: =>
    Input: nums1 = [1,3], nums2 = [2]
    Output: 2.00000
    Explanation: merged array = [1,2,3] and median is 2.

    Example 2: =>
    Input: nums1 = [1,2], nums2 = [3,4]
    Output: 2.50000
    Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
    

    Constraints: => 
    nums1.length == m
    nums2.length == n
    0 <= m <= 1000
    0 <= n <= 1000
    1 <= m + n <= 2000
    -106 <= nums1[i], nums2[i] <= 106
*/

/**
 *
 * @param nums1 number[]
 * @param nums2 number[]
 * @returns number
 */
const findMedianSortedArraysMerge = (
	nums1: number[],
	nums2: number[]
): number => {
	const mergedArray = [...nums1, ...nums2];
	mergedArray.sort((a, b) => a - b);

	if (mergedArray.length % 2 === 0) {
		return (
			(mergedArray[mergedArray.length / 2 - 1] +
				mergedArray[mergedArray.length / 2]) /
			2
		);
	} else {
		return mergedArray[Math.floor(mergedArray.length / 2)];
	}
};

/**
 *
 * @param nums1 number[]
 * @param nums2 number[]
 * @returns number
 */
const findMedianSortedArrays = (nums1: number[], nums2: number[]): number => {
	if (nums1.length > nums2.length) {
		[nums1, nums2] = [nums2, nums1];
	}

	const m: number = nums1.length;
	const n: number = nums2.length;

	let left: number = 0;
	let right: number = m;
	const mid: number = ~~((m + n + 1) / 2);

	while (left <= right) {
		let partition1: number = left + ~~((right - left) / 2);
		let partition2: number = mid - partition1;

		let maxLeft1: number = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
		let minRight1: number = partition1 === m ? Infinity : nums1[partition1];

		let maxLeft2: number = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
		let minRight2: number = partition2 === n ? Infinity : nums2[partition2];

		if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
			if ((m + n) % 2 === 0) {
				return (
					(Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2
				);
			} else {
				return Math.max(maxLeft1, maxLeft2);
			}
		} else if (maxLeft1 > minRight2) {
			right = partition1 - 1;
		} else {
			left = partition1 + 1;
		}
	}

	return 0.0;
};
