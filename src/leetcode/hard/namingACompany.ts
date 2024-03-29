/**
    * desc: You are given an array of strings ideas that represents a list of names to be used in the process of naming a company. The process of naming a company is as follows:

    Choose 2 distinct names from ideas, call them ideaA and ideaB.
    Swap the first letters of ideaA and ideaB with each other.
    If both of the new names are not found in the original ideas, then the name ideaA ideaB (the concatenation of ideaA and ideaB, separated by a space) is a valid company name.
    Otherwise, it is not a valid name.
    Return the number of distinct valid names for the company.

    Example 1: =>
    Input: ideas = ["coffee","donuts","time","toffee"]
    Output: 6
    Explanation: The following selections are valid:
    - ("coffee", "donuts"): The company name created is "doffee conuts".
    - ("donuts", "coffee"): The company name created is "conuts doffee".
    - ("donuts", "time"): The company name created is "tonuts dime".
    - ("donuts", "toffee"): The company name created is "tonuts doffee".
    - ("time", "donuts"): The company name created is "dime tonuts".
    - ("toffee", "donuts"): The company name created is "doffee tonuts".
    Therefore, there are a total of 6 distinct company names.

    The following are some examples of invalid selections:
    - ("coffee", "time"): The name "toffee" formed after swapping already exists in the original array.
    - ("time", "toffee"): Both names are still the same after swapping and exist in the original array.
    - ("coffee", "toffee"): Both names formed after swapping already exist in the original array.

    Example 2: =>
    Input: ideas = ["lack","back"]
    Output: 0
    Explanation: There are no valid selections. Therefore, 0 is returned.
 */


/**
 * @params ideas string[]
 * returns number
 */
const distinctNamesTimeOut = (ideas: string[]): number => {
    const distinctNames: Set<string> = new Set(ideas);
    let count: number = 0;

    for (let i = 0; i < ideas.length - 1; i++) {
        for (let j = i + 1; j < ideas.length; j++) {
            const [ideaA, ideaB] = [ideas[i], ideas[j]];
            const [newSA, newSB] = [`${ideaB[0]}${ideaA.slice(1)}`, `${ideaA[0]}${ideaB.slice(1)}`];

            if(!distinctNames.has(newSA) && !distinctNames.has(newSB)) count += 1;
        }
    }

    return count * 2;
};

/**
 * @params ideas string[]
 * returns number
 */
const distinctNames = (ideas: string[]): number => {
    const ideaGroup: Set<string>[] = Array(26).fill(0).map(num => new Set());
    let count: number = 0;

    for (let idea of ideas) {
        const key: number = idea.charCodeAt(0) - "a".charCodeAt(0);

        ideaGroup[key].add(idea.slice(1));
    }

    for (let i = 0; i < ideaGroup.length - 1; i++) {
        for (let j = i + 1; j < ideaGroup.length; j++) {
            let currSame: number = 0;
            for (let value of ideaGroup[j].values()) {
                if (ideaGroup[i].has(value)) {
                    currSame += 1;
                }
            }

            count += ((ideaGroup[i].size - currSame) * (ideaGroup[j].size - currSame));
        }
    }

    return count * 2;
};