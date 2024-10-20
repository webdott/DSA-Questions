# https://leetcode.com/problems/parsing-a-boolean-expression/

class Solution:
    def parseBoolExpr(self, expression: str) -> bool:
        boolMap = {
            't': True,
            'f': False,
            True: 't',
            False: 'f'
        }

        stack = []

        for char in expression:
            if char == ')':
                curr_expr = []

                while stack and stack[-1] != '(':
                    curr_expr.append(stack.pop())

                if stack:
                    stack.pop()

                final_expr = boolMap[curr_expr[0]]

                if stack and stack[-1] == '&':
                    for bol in curr_expr:
                        final_expr &= boolMap[bol]
                    
                elif stack and stack[-1] == '|':
                    for bol in curr_expr:
                        final_expr |= boolMap[bol]
                
                elif stack and stack[-1] == '!':
                    final_expr = not final_expr

                if stack:
                    stack.pop()

                if final_expr is not None:
                    stack.append(boolMap[final_expr])
            elif char != ',':
                stack.append(char)

        return boolMap[stack[0]]