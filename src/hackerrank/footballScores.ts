/**
    * desc: The number of goals achieved by two football teams in matches in a league is given in the form of two lists. For each match of team B, compute the total number of matches of team A where team A has scored less than or equal to the number of goals scored by team B in that match.
     
    * Example =>
    teamA = [1, 2, 3]
    teamB = [1, 4, 2]
    Team A has played three matches and has scored
    teamA = [1, 2, 3] goals in each match respectively.
    Team B has played two matches and has scored
    teamB = (2, 4) goals in each match respectively. For
    2 goals scored by team B in its first match, team A has 2 matches with scores 1 and 2. For 4 goals scored by team B in its second match, team A has 3 matches with scores 1, 2 and 3. Hence, the answer is [2, 3].

    Function Description
    Complete the function in the editor below:
    Modify submission of question counts has the following parameters 
    int teamA[]: first array of positive integers 
    int teamB[]: second array of positive integers.
 */

const footballScores = (teamA: number[], teamB: number[]): number[] => {
	let result: number[] = [];
	let count: number = 0;

	teamA.sort((a, b) => a - b);

	const modifiedTeamB: number[][] = [];

	for (let i = 0; i < teamB.length; i++) {
		modifiedTeamB.push([i, teamB[i]]);
	}

	modifiedTeamB.sort((a, b) => a[1] - b[1]);

	for (let i = 0; i < teamB.length; i++) {
		while (count < teamB.length) {
			if (teamA[count] <= modifiedTeamB[i][1]) {
				count += 1;
			} else {
				break;
			}
		}

		result[modifiedTeamB[i][0]] = count;
		count += 1;
	}

	return result;
};
