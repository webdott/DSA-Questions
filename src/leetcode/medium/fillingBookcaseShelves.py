# You are given an array books where books[i] = [thicknessi, heighti] indicates the thickness and height of the ith book. You are also given an integer shelfWidth.

# We want to place these books in order onto bookcase shelves that have a total width shelfWidth.

# We choose some of the books to place on this shelf such that the sum of their thickness is less than or equal to shelfWidth, then build another level of the shelf of the bookcase so that the total height of the bookcase has increased by the maximum height of the books we just put down. We repeat this process until there are no more books to place.

# Note that at each step of the above process, the order of the books we place is the same order as the given sequence of books.

# For example, if we have an ordered list of 5 books, we might place the first and second book onto the first shelf, the third book on the second shelf, and the fourth and fifth book on the last shelf.
# Return the minimum possible height that the total bookshelf can be after placing shelves in this manner.

# Example 1: =>
# Input: books = [[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]], shelfWidth = 4
# Output: 6
# Explanation:
# The sum of the heights of the 3 shelves is 1 + 3 + 2 = 6.
# Notice that book number 2 does not have to be on the first shelf.

# Example 2: =>
# Input: books = [[1,3],[2,4],[3,2]], shelfWidth = 6
# Output: 4

# Constraints: =>
# 1 <= books.length <= 1000
# 1 <= thicknessi <= shelfWidth <= 1000
# 1 <= heighti <= 1000

import math
from typing import List


class Solution:
    def dp(
        self,
        bookIdx: int,
        books: List[List[int]],
        remainingShelfWidth: int,
        shelfWidth: int,
        maxHeight: int,
        cache: List[List[int]],
    ) -> int:
        if bookIdx >= len(books):
            return maxHeight

        if cache[bookIdx][remainingShelfWidth] > -1:
            return cache[bookIdx][remainingShelfWidth]

        width, height = books[bookIdx]

        add_book = math.inf
        # add book to current shelf if there is a space
        if remainingShelfWidth >= width:
            add_book = min(
                add_book,
                self.dp(
                    bookIdx + 1,
                    books,
                    remainingShelfWidth - width,
                    shelfWidth,
                    max(maxHeight, height),
                    cache,
                ),
            )

        # add book to new shelf
        not_add_book = self.dp(
            bookIdx + 1, books, shelfWidth - width, shelfWidth, height, cache
        )

        #  calculate min height
        cache[bookIdx][remainingShelfWidth] = min(add_book, maxHeight + not_add_book)

        return cache[bookIdx][remainingShelfWidth]

    def minHeightShelves(self, books: List[List[int]], shelfWidth: int) -> int:
        cache = [[-1] * (shelfWidth + 1) for i in range(len(books))]

        return self.dp(0, books, shelfWidth, shelfWidth, 0, cache)
