# https://leetcode.com/problems/maximum-swap/description/

class Solution:
    def maximumSwap(self, num: int) -> int:
        max_list = list(str(num))
        n = len(max_list)

        i = 0

        for i in range(n) :
            if i < len(max_list):
                other_max, k = -1, -1

                for j in range(n - 1, i, -1):
                    if int(max_list[j]) > int(other_max):
                        other_max = max_list[j]
                        k = j

                if int(other_max) > int(max_list[i]):
                    max_list[i], max_list[k] = max_list[k], max_list[i]
                    break
                else:
                    i += 1
            else:
                break

        return int("".join(max_list))