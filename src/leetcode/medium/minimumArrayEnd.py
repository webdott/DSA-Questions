# https://leetcode.com/problems/minimum-array-end/description/

class Solution:
    def minEnd(self, n: int, x: int) -> int:
        bin_x, bin_n = [0] * 64, [0] * 64

        for i in range(64):
            bin_x[i] = (x >> i) & 1

            bin_n[i] = (n - 1 >> i) & 1

        pos_x, pos_n = 0, 0

        while pos_x < 63:
            while bin_x[pos_x] != 0 and pos_x < 63:
                pos_x += 1

            bin_x[pos_x] = bin_n[pos_n]
            pos_x += 1
            pos_n += 1

        res = 0

        for i in range(64):
            if bin_x[i] == 1:
                res += (2 ** i)

        return res

