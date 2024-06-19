class Solution:
    def maxConsecutiveAnswersWithKey(self, answerKey: str, k: int, key: str) -> int:
        max_consec, n, left, right = 0, len(answerKey), 0, 0

        while right < n:
            if answerKey[right] == key:
                while k == 0:
                    if answerKey[left] == key:
                        k += 1

                    left += 1

                k -= 1

            max_consec = max(max_consec, right - left + 1)
            right += 1

        return max_consec

    def maxConsecutiveAnswers(self, answerKey: str, k: int) -> int:
        max_a = self.maxConsecutiveAnswersWithKey(answerKey, k, "T")
        max_b = self.maxConsecutiveAnswersWithKey(answerKey, k, "F")

        return max(max_a, max_b)
