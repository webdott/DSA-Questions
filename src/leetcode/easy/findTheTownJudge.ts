/**
    * desc: In a town, there are n people labeled from 1 to n. There is a rumor that one of these people is secretly the town judge.

    If the town judge exists, then:

    The town judge trusts nobody.
    Everybody (except for the town judge) trusts the town judge.
    There is exactly one person that satisfies properties 1 and 2.
    You are given an array trust where trust[i] = [ai, bi] representing that the person labeled ai trusts the person labeled bi.

    Return the label of the town judge if the town judge exists and can be identified, or return -1 otherwise.

    Example 1: =>
    Input: n = 2, trust = [[1,2]]
    Output: 2

    Example 2: =>
    Input: n = 3, trust = [[1,3],[2,3]]
    Output: 3

    Example 3: =>
    Input: n = 3, trust = [[1,3],[2,3],[3,1]]
    Output: -1
    
    Constraints: =>
    1 <= n <= 1000
    0 <= trust.length <= 104
    trust[i].length == 2
    All the pairs of trust are unique.
    ai != bi
    1 <= ai, bi <= n
 */

/**
 *
 * @param n number
 * @param trust number[][]
 * @returns number
 */
const findJudge = (n: number, trust: number[][]): number => {
	if (n === 1) return 1;

	const trustedMap: Map<number, number[]> = new Map();
	const trusters: Set<number> = new Set();

	for (let person of trust) {
		const [truster, trusted] = person;

		trustedMap.set(trusted, [...(trustedMap.get(trusted) ?? []), truster]);
		trusters.add(truster);
	}

	for (let [key, value] of trustedMap.entries()) {
		if (value.length === n - 1 && !trusters.has(key)) {
			return key;
		}
	}

	return -1;
};
