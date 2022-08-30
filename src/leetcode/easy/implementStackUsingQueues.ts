/**
    * desc: Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).

    Implement the MyStack class:

    void push(int x) Pushes element x to the top of the stack.
    int pop() Removes the element on the top of the stack and returns it.
    int top() Returns the element on the top of the stack.
    boolean empty() Returns true if the stack is empty, false otherwise.

    Notes: =>
    You must use only standard operations of a queue, which means that only push to back, peek/pop from front, size and is empty operations are valid.
    Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.
    

    Example 1: =>
    Input
    ["MyStack", "push", "push", "top", "pop", "empty"]
    [[], [1], [2], [], [], []]
    Output
    [null, null, null, 2, 2, false]
    Explanation
    MyStack myStack = new MyStack();
    myStack.push(1);
    myStack.push(2);
    myStack.top(); // return 2
    myStack.pop(); // return 2
    myStack.empty(); // return False
    

    Constraints: =>
    1 <= x <= 9
    At most 100 calls will be made to push, pop, top, and empty.
    All the calls to pop and top are valid.

    Follow-up: Can you implement the stack using only one queue?
 */

class MyStack {
	private queue1: number[];
	private queue2: number[];
	private _top: number;

	constructor() {
		this.queue1 = [];
		this.queue2 = [];
		this._top = -1;
	}

	// Push a new element to the main queue.
	push(x: number): void {
		this.queue1.push(x);
		this._top = x;
	}

	// if backup queue is empty and main queue is not, pop all elements of the main queue to the backup queue and return last element of the backup queue. Switch the queues after operation.
	pop(): number {
		let valueToPop: number = -1;

		while (this.queue1.length > 0) {
			if (this.queue1.length === 1) {
				valueToPop = this.queue1.shift() as number;
			} else {
				this.queue2.push(this.queue1.shift() as number);
			}
		}

		this._top = this.queue2[this.queue2.length - 1];
		let temp = this.queue1;
		this.queue1 = this.queue2;
		this.queue2 = temp;
		return valueToPop;
	}

	// return top of the stack.
	top(): number {
		return this._top;
	}

	// check if both queues are empty.
	empty(): boolean {
		return Boolean(this.queue1.length === 0 && this.queue2.length === 0);
	}
}

/**
 * ========================================== Follow up with 1 Queue=========================================================
 */

class MyStack1 {
	private queue1: number[];

	constructor() {
		this.queue1 = [];
	}

	// Create a temp queue and append new number to it. Then append elements of main queue to the temp queue. Then make main queue as temp queue.
	push(x: number): void {
		const temp: number[] = [x];

		for (let num of this.queue1) {
			temp.push(num);
		}

		this.queue1 = temp;
	}

	// if main queue is empty, return -1. Else, remove and return first element of main queue.
	pop(): number {
		return this.queue1.shift() ?? -1;
	}

	// if main queue is empty, return -1. Else, return first element of main queue.
	top(): number {
		return this.queue1[0];
	}

	// return true if main queue is empty, else return false.
	empty(): boolean {
		return Boolean(this.queue1.length === 0);
	}
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
