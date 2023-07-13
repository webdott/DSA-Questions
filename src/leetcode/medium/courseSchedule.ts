/**
 * desc: There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
 *
 * For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
 * Return true if you can finish all courses. Otherwise, return false.
 *
 * Example 1: =>
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: true
 * Explanation: There are a total of 2 courses to take.
 * To take course 1 you should have finished course 0. So it is possible.
 *
 * Example 2: =>
 * Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
 * Output: false
 * Explanation: There are a total of 2 courses to take.
 * To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
 *
 * Constraints: =>
 * 1 <= numCourses <= 2000
 * 0 <= prerequisites.length <= 5000
 * prerequisites[i].length == 2
 * 0 <= ai, bi < numCourses
 * All the pairs prerequisites[i] are unique.
 */

/**
 *
 * @param numCourses
 * @param prerequisites
 * @returns boolean
 */
const canFinish = (numCourses: number, prerequisites: number[][]): boolean => {
    const adjList: Record<number, number[]> = {};

    for (let prerequisite of prerequisites) {
        const [p1, p2] = prerequisite;

        if(!adjList[p2]) adjList[p2] = [];

        adjList[p2].push(p1);
    }

    const visited: Set<number> = new Set();
    const inStack: Set<number> = new Set();

    const dfs = (course: number) => {
        if(inStack.has(course)) return false;
        if(visited.has(course)) return true;

        visited.add(course);
        inStack.add(course);

        for (let nextCourse of (adjList[course]) ?? []) {
            if(!dfs(nextCourse)) return false;
        }

        inStack.delete(course);
        return true;
    }

    for (let i = 0; i < numCourses; i++) {
        dfs(i);
    }

    return inStack.size === 0;
};