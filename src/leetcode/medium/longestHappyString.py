# https://leetcode.com/problems/longest-happy-string/description/

import heapq
from typing import List, Tuple


class Solution:
    def getCurrentChar(self, heap: List[int], char_to_remove:int, res: str) -> Tuple[int, int, str, bool]:
        freq, char = heapq.heappop(heap)

        break_loop = False

        if(len(res) >= 2 and res[-2] == char == res[-1]):
            break_loop = True

        repeat = min(-freq, char_to_remove - (1 if len(res) and res[-1] == char else 0))

        freq += repeat

        return (repeat, freq, char, break_loop)

    def longestDiverseString(self, a: int, b: int, c: int) -> str:
        heap = []

        if(a > 0):
            heapq.heappush(heap, (-a, 'a'))

        if(b > 0):
            heapq.heappush(heap, (-b, 'b'))

        if(c > 0):
            heapq.heappush(heap, (-c, 'c'))

        res = ""

        while len(heap) > 0:
            repeat, freq, char, break_loop = self.getCurrentChar(heap, 2, res)

            if break_loop:
                break

            res += (char * repeat)

            if len(heap) > 0:
                repeat_2, freq_2, char_2, bl = self.getCurrentChar(heap, 1, res)

                res += (char_2 * repeat_2)

                if(freq_2 < 0):
                    heapq.heappush(heap, (freq_2, char_2))
            else:
                break

            if(freq < 0):
                heapq.heappush(heap, (freq, char))
        
        return res