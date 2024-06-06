# Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards.

# Given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return true if she can rearrange the cards, or false otherwise.

# Example 1: =>
# Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
# Output: true
# Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]

# Example 2: =>
# Input: hand = [1,2,3,4,5], groupSize = 4
# Output: false
# Explanation: Alice's hand can not be rearranged into groups of 4.

# Constraints: =>
# 1 <= hand.length <= 104
# 0 <= hand[i] <= 109
# 1 <= groupSize <= hand.length


class Solution:
    def isNStraightHand(self, hand: list[int], groupSize: int) -> bool:
        # if the hand cannot be divided into groups of size groupSize, return False
        if len(hand) % groupSize > 0:
            return False

        num_divs = len(hand) // groupSize

        hand.sort()

        res = []

        for num in hand:
            add_num = True

            # try to add the number to an existing group
            for i in range(len(res)):
                if groupSize > len(res[i]) > 0 and res[i][-1] == num - 1:
                    res[i].append(num)
                    add_num = False
                    break

            # if the number was not added to any group, create a new group
            if add_num:
                res.append([num])

            # if there are more groups than ideal, return False
            if len(res) > num_divs:
                return False

        #  if there is a group that is not complete, return False
        for group in res:
            if len(group) < groupSize:
                return False

        return True
