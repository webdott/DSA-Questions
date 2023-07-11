/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = this.parent = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
const distanceK = function(root, target, k) {
    const visited = new Set();
    const ans = [];
    let targetExtended = null;

    const addParent = (curr, parent) => {
        if(curr === null) return;

        if(curr.val === target.val) targetExtended = curr;
        curr.parent = parent;

        addParent(curr.left, curr);
        addParent(curr.right, curr);
    }

    addParent(root, null);

    const dfs = (node, distance) => {
        if(node === null || visited.has(node)) return;

        visited.add(node);

        if(distance === k) {
            ans.push(node.val);
            return;
        }

        distance += 1;

        dfs(node.left, distance);
        dfs(node.right, distance);
        dfs(node.parent, distance);
    }

    dfs(targetExtended, 0);

    return ans;
};