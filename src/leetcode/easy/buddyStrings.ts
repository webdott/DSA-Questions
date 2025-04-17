/**
 * desc: Given two strings s and goal, return true if you can swap two letters in s so the result is equal to goal, otherwise, return false.
 *
 * Swapping letters is defined as taking two indices i and j (0-indexed) such that i != j and swapping the characters at s[i] and s[j].
 *
 * For example, swapping at indices 0 and 2 in "abcd" results in "cbad".
 *
 * Example 1: =>
 * Input: s = "ab", goal = "ba"
 * Output: true
 * Explanation: You can swap s[0] = 'a' and s[1] = 'b' to get "ba", which is equal to goal.
 *
 * Example 2: =>
 * Input: s = "ab", goal = "ab"
 * Output: false
 * Explanation: The only letters you can swap are s[0] = 'a' and s[1] = 'b', which results in "ba" != goal.
 *
 * Example 3: =>
 * Input: s = "aa", goal = "aa"
 * Output: true
 * Explanation: You can swap s[0] = 'a' and s[1] = 'a' to get "aa", which is equal to goal.
 *
 * Constraints: =>
 * 1 <= s.length, goal.length <= 2 * 104
 * s and goal consist of lowercase letters.
 */

/**
 *
 * @param s
 * @param goal
 */
const buddyStrings = (s: string, goal: string): boolean => {
    if(s.length !== goal.length || s.length === 1) return false;

    const hashTable: Record<string, number> = {};

    let left: number = 0;
    let right: number = s.length - 1;
    let leftStrIdx: number = -1;
    let rightStrIdx: number = -1;

    while (left <= right) {
        if(leftStrIdx === -1) {
            if(s[left] === goal[left]) {
                hashTable[s[left]] = (hashTable[s[left]] ?? 0) + 1;
                left += 1;
            } else {
                leftStrIdx = left;
            }
        }

        if(rightStrIdx === -1) {
            if(s[right] === goal[right]) {
                hashTable[s[right]] = (hashTable[s[right]] ?? 0) + 1;
                right -= 1;
            } else {
                rightStrIdx = right;
            }

        }

        if(leftStrIdx > -1 && rightStrIdx > - 1) {
            const tempLeft: string = s[leftStrIdx];
            const tempS = s.split('');

            tempS.splice(leftStrIdx, 1, s[rightStrIdx])
            tempS.splice(rightStrIdx, 1, tempLeft)
            s = tempS.join('');

            return s === goal;
        }

    }

    if(s === goal) {
        for(let str in hashTable) {
            if(hashTable[str] > 1) return true;
        }
    }

    return false;
};
