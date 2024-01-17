# * desc: Implement the RandomizedSet class:

# RandomizedSet() Initializes the RandomizedSet object.
# bool insert(int val) Inserts an item val into the set if not present. Returns true if the item was not present, false otherwise.
# bool remove(int val) Removes an item val from the set if present. Returns true if the item was present, false otherwise.
# int getRandom() Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.
# You must implement the functions of the class such that each function works in average O(1) time complexity.

# Example 1: =>
# Input
# ["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
# [[], [1], [2], [2], [], [1], [2], []]
# Output
# [null, true, false, true, 2, true, false, 2]

# Explanation
# RandomizedSet randomizedSet = new RandomizedSet();
# randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
# randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
# randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
# randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
# randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
# randomizedSet.insert(2); // 2 was already in the set, so return false.
# randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.

# Constraints: =>
# -231 <= val <= 231 - 1
# At most 2 * 105 calls will be made to insert, remove, and getRandom.
# There will be at least one element in the data structure when getRandom is called.

from random import random


class RandomizedSet:
    def __init__(self):
        self.main_set = {}
        self.rand_set = []

    # O(1)
    def insert(self, val: int) -> bool:
        if val not in self.main_set:
            self.main_set[val] = len(self.rand_set)
            self.rand_set.append(val)
            return True

        return False

    # O(1)
    def remove(self, val: int) -> bool:
        if val in self.main_set:
            last_el = self.rand_set[-1]
            idx_to_remove = self.main_set[val]

            self.rand_set[-1], self.rand_set[idx_to_remove] = (
                self.rand_set[idx_to_remove],
                self.rand_set[-1],
            )
            self.main_set[last_el] = idx_to_remove
            self.rand_set.pop()
            del self.main_set[val]
            return True

        return False

    # O(1)
    def getRandom(self) -> int:
        roullette_idx = int(random.random() * len(self.rand_set))
        return self.rand_set[roullette_idx]


# Your RandomizedSet object will be instantiated and called as such:
# obj = RandomizedSet()
# param_1 = obj.insert(val)
# param_2 = obj.remove(val)
# param_3 = obj.getRandom()
