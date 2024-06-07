class Trie:
    def __init__(self):
        self.tree = {}

    def addWord(self, word: str):
        idx, curr = 0, self.tree

        while idx < len(word):
            char = word[idx]

            if char not in curr:
                curr[char] = {}

            curr = curr[char]
            idx += 1

        curr["end"] = True

    def getRoot(self, word: str):
        idx, curr = 0, self.tree

        if word[idx] not in curr:
            return word

        while idx < len(word):
            char = word[idx]

            if "end" in curr:
                return word[0:idx]

            if char not in curr:
                return word

            curr = curr[char]
            idx += 1

        return word


class Solution:
    def replaceWords(self, dictionary: list[str], sentence: str) -> str:
        res, trie, words = "", Trie(), sentence.split()

        for root in dictionary:
            trie.addWord(root)

        for word in words:
            res += ("" if res == "" else " ") + trie.getRoot(word)

        return res
