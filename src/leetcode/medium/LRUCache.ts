/**
    * desc: Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

    Implement the LRUCache class:

    LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
    int get(int key) Return the value of the key if the key exists, otherwise return -1.
    void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
    The functions get and put must each run in O(1) average time complexity.

    Example 1: =>
    Input
    ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
    [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
    Output
    [null, null, null, 1, null, -1, null, -1, 3, 4]

    Explanation
    LRUCache lRUCache = new LRUCache(2);
    lRUCache.put(1, 1); // cache is {1=1}
    lRUCache.put(2, 2); // cache is {1=1, 2=2}
    lRUCache.get(1);    // return 1
    lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
    lRUCache.get(2);    // returns -1 (not found)
    lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
    lRUCache.get(1);    // return -1 (not found)
    lRUCache.get(3);    // return 3
    lRUCache.get(4);    // return 4
    

    Constraints: =>
    1 <= capacity <= 3000
    0 <= key <= 104
    0 <= value <= 105
    At most 2 * 105 calls will be made to get and put.
 */

class DoubleListNode {
	val: number[];
	next: DoubleListNode | null;
	prev: DoubleListNode | null;
	constructor(
		val?: number[],
		next?: DoubleListNode | null,
		prev?: DoubleListNode | null
	) {
		this.prev = prev === undefined ? null : prev;
		this.val = val === undefined ? [Infinity, Infinity] : val;
		this.next = next === undefined ? null : next;
	}
}

class LRUCache {
	public cacheCapacity: number;
	public cache: Map<number, DoubleListNode>;
	public LRUKey: DoubleListNode;
	public mostRecent: DoubleListNode;

	constructor(capacity: number) {
		this.cacheCapacity = capacity;
		this.cache = new Map();
		this.LRUKey = new DoubleListNode([-1, -1]);
		this.mostRecent = this.LRUKey;
	}

	get(key: number): number {
		const value = this.cache.has(key) ? this.cache.get(key)!.val[1] : -1;

		if (value !== -1) {
			let nodeToRemove = this.cache.get(key) as DoubleListNode;

			if (nodeToRemove.next !== null) {
				nodeToRemove.prev!.next = nodeToRemove.next;
				nodeToRemove.next.prev = nodeToRemove.prev;
				nodeToRemove.prev = this.mostRecent;
				this.mostRecent.next = nodeToRemove;
				nodeToRemove.next = null;
				this.mostRecent = nodeToRemove;
			}
		}

		return value;
	}

	put(key: number, value: number): void {
		let nodeToAdd = new DoubleListNode([key, value]);
		this.mostRecent.next = nodeToAdd;
		nodeToAdd.prev = this.mostRecent;
		this.mostRecent = nodeToAdd;

		if (this.cache.has(key)) {
			let nodeToRemove = this.cache.get(key) as DoubleListNode;

			nodeToRemove.prev!.next = nodeToRemove.next;
			nodeToRemove.next!.prev = nodeToRemove.prev;
		} else {
			if (this.cache.size === this.cacheCapacity) {
				let nodeToRemove = this.LRUKey.next as DoubleListNode;

				nodeToRemove.prev!.next = nodeToRemove.next;
				if (nodeToRemove.next !== null)
					nodeToRemove.next.prev = nodeToRemove.prev;
				this.cache.delete(nodeToRemove.val[0]);
			}
		}

		this.cache.set(key, nodeToAdd);
	}
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
