const maximum69Number = (num: number): number => {
	let newNum: number = 0;
	let seen: boolean = false;
	let digits: number[] = [];

	while (num > 0) {
		let digit: number = num % 10;

		digits.unshift(digit);
		num = ~~(num / 10);
	}

	let level: number = digits.length - 1;

	for (let digit of digits) {
		let tenPower: number = 10 ** level;

		if (digit === 6 && !seen) {
			newNum += 9 * tenPower;
			seen = true;
		} else {
			newNum += digit * tenPower;
		}

		level -= 1;
	}

	return newNum;
};
