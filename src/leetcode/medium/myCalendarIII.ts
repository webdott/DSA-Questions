/**
    * desc: A k-booking happens when k events have some non-empty intersection (i.e., there is some time that is common to all k events.)

    You are given some events [start, end), after each given event, return an integer k representing the maximum k-booking between all the previous events.

    Implement the MyCalendarThree class:

    MyCalendarThree() Initializes the object.
    int book(int start, int end) Returns an integer k representing the largest integer such that there exists a k-booking in the calendar.
    

    Example 1: =>
    Input
    ["MyCalendarThree", "book", "book", "book", "book", "book", "book"]
    [[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
    Output
    [null, 1, 1, 2, 3, 3, 3]

    Explanation
    MyCalendarThree myCalendarThree = new MyCalendarThree();
    myCalendarThree.book(10, 20); // return 1, The first event can be booked and is disjoint, so the maximum k-booking is a 1-booking.
    myCalendarThree.book(50, 60); // return 1, The second event can be booked and is disjoint, so the maximum k-booking is a 1-booking.
    myCalendarThree.book(10, 40); // return 2, The third event [10, 40) intersects the first event, and the maximum k-booking is a 2-booking.
    myCalendarThree.book(5, 15); // return 3, The remaining events cause the maximum K-booking to be only a 3-booking.
    myCalendarThree.book(5, 10); // return 3
    myCalendarThree.book(25, 55); // return 3
    

    Constraints: =>
    0 <= start < end <= 109
    At most 400 calls will be made to book.
 */

class MyCalendarThree {
	private vals: Map<number, number>;
	private lazy: Map<number, number>;

	constructor() {
		this.vals = new Map();
		this.lazy = new Map();
	}

	update(
		start: number,
		end: number,
		left: number,
		right: number,
		idx: number
	): void {
		// check if the interval doesn't lap at all
		if (end < left || start > right) return;

		// check if completely lapped
		if (left >= start && right <= end) {
			this.vals.set(idx, (this.vals.get(idx) ?? 0) + 1);
			this.lazy.set(idx, (this.lazy.get(idx) ?? 0) + 1);
		} else {
			let mid: number = ~~((left + right) / 2);
			this.update(start, end, left, mid, 2 * idx + 1);
			this.update(start, end, mid + 1, right, 2 * idx + 2);

			this.vals.set(
				idx,
				(this.lazy.get(idx) ?? 0) +
					Math.max(
						this.vals.get(2 * idx + 1) ?? 0,
						this.vals.get(2 * idx + 2) ?? 0
					)
			);
		}
	}

	book(start: number, end: number): number {
		this.update(start, end - 1, 0, 1000000000, 0);
		return this.vals.get(0) ?? 0;
	}
}

/**
 * Your MyCalendarThree object will be instantiated and called as such:
 * var obj = new MyCalendarThree()
 * var param_1 = obj.book(start,end)
 */
