/**
    * desc: Implement the RandomizedSet class:

    RandomizedSet() Initializes the RandomizedSet object.
    bool insert(int val) Inserts an item val into the set if not present. Returns true if the item was not present, false otherwise.
    bool remove(int val) Removes an item val from the set if present. Returns true if the item was present, false otherwise.
    int getRandom() Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.
    You must implement the functions of the class such that each function works in average O(1) time complexity.


    Example 1: =>
    Input
    ["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
    [[], [1], [2], [2], [], [1], [2], []]
    Output
    [null, true, false, true, 2, true, false, 2]

    Explanation
    RandomizedSet randomizedSet = new RandomizedSet();
    randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
    randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
    randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
    randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
    randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
    randomizedSet.insert(2); // 2 was already in the set, so return false.
    randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.
    
    Constraints: =>
    -231 <= val <= 231 - 1
    At most 2 * 105 calls will be made to insert, remove, and getRandom.
    There will be at least one element in the data structure when getRandom is called.
 */


class RandomizedSet {
	private randomizedSet: Set<number>;

	constructor() {
		this.randomizedSet = new Set();
	}

	/**
	 *
	 * @param val number
	 * @returns boolen
	 * this is in O(1) time
	 */
	insert(val: number): boolean {
		let wasPresent: boolean = this.randomizedSet.has(val);

		this.randomizedSet.add(val);

		return !wasPresent;
	}

	/**
	 *
	 * @param val number
	 * @returns boolen
	 * this is in O(1) time
	 */
	remove(val: number): boolean {
		let isPresent: boolean = this.randomizedSet.has(val);

		if (isPresent) this.randomizedSet.delete(val);

		return isPresent;
	}

	/**
	 *
	 * @param val number
	 * @returns boolen
	 * this is in O(n) time
	 */
	getRandom(): number {
		let roulette: number[] = [];

		for (let val of this.randomizedSet.values()) {
			roulette.push(val);
		}

		return roulette[~~(Math.random() * roulette.length)];
	}
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

 class RandomizedSetO1 {
    private randomizedSet: Map<number, number>;
    private randomizedSetCopy: Map<number, number>;
    private count: number;

    constructor() {
        this.randomizedSet = new Map();
        this.randomizedSetCopy = new Map();
        this.count = 0;
    }

    insert(val: number): boolean {
        let wasPresent: boolean = this.randomizedSet.has(val);

        if(!wasPresent) {
            this.randomizedSet.set(val, this.count);
            this.randomizedSetCopy.set(this.count, val);
            this.count += 1;
        }

        return !wasPresent;
    }

    remove(val: number): boolean {
        let isPresent: boolean = this.randomizedSet.has(val);

        if(isPresent) {
            // swap first with last
            let idxToSwap: number = this.randomizedSet.get(val)!;
            let valToSwap: number = this.randomizedSetCopy.get(this.count - 1)!;

            this.randomizedSet.set(valToSwap, idxToSwap);
            this.randomizedSetCopy.set(idxToSwap, valToSwap);

            this.randomizedSet.delete(val);
            this.randomizedSetCopy.delete(this.count - 1);
            this.count -= 1;
        }

        return isPresent;
    }

    getRandom(): number {
        return this.randomizedSetCopy.get(~~(Math.random() * this.randomizedSetCopy.size))!
    }
}
