# desc: https://leetcode.com/problems/count-and-say/description/?envType=daily-question&envId=2025-04-18
 
class Solution:
    def RLE(self, char: str) -> str:
        curr, count = "", 0
        res = []

        for c in char:
            if c == curr or curr == "":
                count += 1
            else:
                res.append(str(count))
                res.append(curr)
                count = 1

            curr = c

        res.append(str(count))
        res.append(curr)

        return "".join(res)

    def countAndSay(self, n: int) -> str:
        if n == 1:
            return "1"
        else:
            return self.RLE(self.countAndSay(n - 1))