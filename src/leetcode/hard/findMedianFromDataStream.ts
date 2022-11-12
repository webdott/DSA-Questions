/**
    * desc: The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

    For example, for arr = [2,3,4], the median is 3.
    For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
    Implement the MedianFinder class:

    MedianFinder() initializes the MedianFinder object.
    void addNum(int num) adds the integer num from the data stream to the data structure.
    double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.

    Example 1: =>
    Input
    ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
    [[], [1], [2], [], [3], []]
    Output
    [null, null, null, 1.5, null, 2.0]

    Explanation
    MedianFinder medianFinder = new MedianFinder();
    medianFinder.addNum(1);    // arr = [1]
    medianFinder.addNum(2);    // arr = [1, 2]
    medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
    medianFinder.addNum(3);    // arr[1, 2, 3]
    medianFinder.findMedian(); // return 2.0
    
    Constraints: =>
    -105 <= num <= 105
    There will be at least one element in the data structure before calling findMedian.
    At most 5 * 104 calls will be made to addNum and findMedian.
    
    Follow up: =>
    If all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
    If 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
 */

import {
	MaxPriorityQueue,
	MinPriorityQueue,
} from '@datastructures-js/priority-queue';

class MedianFinderMonotonicStack {
	private nums: number[];

	constructor() {
		this.nums = [];
	}

	addNum(num: number): void {
		let temp: number[] = [];

		while (this.nums.length > 0 && this.nums[this.nums.length - 1] > num) {
			temp.unshift(this.nums.pop()!);
		}

		this.nums.push(num, ...temp);
	}

	findMedian(): number {
		let mid: number = ~~(this.nums.length / 2);
		if (this.nums.length % 2 === 0) {
			return (this.nums[mid - 1] + this.nums[mid]) / 2;
		} else {
			return this.nums[mid];
		}
	}
}

class MedianFinderBinarySearch {
	private nums: number[];

	constructor() {
		this.nums = [];
	}

	addNum(num: number): void {
		let left: number = 0;
		let right: number = this.nums.length - 1;

		while (left <= right) {
			let mid: number = left + ~~((right - left) / 2);

			if (this.nums[mid] === num) {
				this.nums.splice(mid, 0, num);
				return;
			} else if (this.nums[mid] > num) {
				right = mid - 1;
			} else {
				left = mid + 1;
			}
		}

		this.nums.splice(left, 0, num);
	}

	findMedian(): number {
		let mid: number = ~~(this.nums.length / 2);
		if (this.nums.length % 2 === 0) {
			return (this.nums[mid - 1] + this.nums[mid]) / 2;
		} else {
			return this.nums[mid];
		}
	}
}

class MedianFinderPriorityQueue {
	private nums: number[];
	private minQueue;
	private maxQueue;

	constructor() {
		this.nums = [];
		this.minQueue = new MinPriorityQueue();
		this.maxQueue = new MaxPriorityQueue();
	}

	addNum(num: number): void {
		if (!this.minQueue.size() || this.minQueue?.front()?.element < num) {
			this.minQueue.enqueue(num);
		} else {
			this.maxQueue.enqueue(num);
		}

		if (this.maxQueue.size() > this.minQueue.size() + 1) {
			this.minQueue.enqueue(this.maxQueue.dequeue().element);
		} else if (this.minQueue.size() > this.maxQueue.size() + 1) {
			this.maxQueue.enqueue(this.minQueue.dequeue().element);
		}
	}

	findMedian(): number {
		let mid: number = ~~(this.nums.length / 2);
		if (this.nums.length % 2 === 0) {
			return (this.nums[mid - 1] + this.nums[mid]) / 2;
		} else {
			return this.nums[mid];
		}
	}
}
/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
