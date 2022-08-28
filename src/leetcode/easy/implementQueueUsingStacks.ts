/**
     * desc: mplement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

    Implement the MyQueue class:

    void push(int x) Pushes element x to the back of the queue.
    int pop() Removes the element from the front of the queue and returns it.
    int peek() Returns the element at the front of the queue.
    boolean empty() Returns true if the queue is empty, false otherwise.
    Notes:

    You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
    Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.
    
    Example 1: =>
    Input
    ["MyQueue", "push", "push", "peek", "pop", "empty"]
    [[], [1], [2], [], [], []]
    Output
    [null, null, null, 1, 1, false]
    Explanation
    MyQueue myQueue = new MyQueue();
    myQueue.push(1); // queue is: [1]
    myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
    myQueue.peek(); // return 1
    myQueue.pop(); // return 1, queue is [2]
    myQueue.empty(); // return false
    
    Constraints: =>
    1 <= x <= 9
    At most 100 calls will be made to push, pop, peek, and empty.
    All the calls to pop and peek are valid.
    
    Follow-up: Can you implement the queue such that each operation is amortized O(1) time complexity? In other words, performing n operations will take overall O(n) time even if one of those operations may take longer.
 * 
 */

class MyQueue {
	private stack1: number[];
	private stack2: number[];

	constructor() {
		this.stack1 = [];
		this.stack2 = [];
	}

	// push element x to the back of the main stack.
	push(x: number): void {
		this.stack1.push(x);
	}

	// if backup stack is empty and main stack is not, pop all elements of the main stack to the backup stack and return last element of the backup stack.
	pop(): number {
		if (this.stack2.length === 0 && this.stack1.length > 0) {
			for (let i = this.stack1.length - 1; i >= 0; i--) {
				const char: number = this.stack1.pop() as number;
				if (i === 0) {
					return char;
				} else {
					this.stack2.push(char);
				}
			}
		}

		return this.stack2.pop() ?? -1;
	}

	// return the last element of the backup stack if present or first element of the main stack.
	peek(): number {
		return this.stack2[this.stack2.length - 1] ?? this.stack1[0];
	}

	// check if both stacks are empty.
	empty(): boolean {
		return Boolean(this.stack1.length === 0 && this.stack2.length === 0);
	}
}

/**
 * const obj = new MyQueue();
 * obj.push(1);
 * obj.push(2);
 * const param_2 = obj.pop();
 * const param_3 = obj.peek();
 * const param_4 = obj.empty();
 * const param_5 = obj.pop();
 * const param_6 = obj.pop();
 * const param_7 = obj.pop();
 * const param_8 = obj.pop();
 */

// 232
// 844
