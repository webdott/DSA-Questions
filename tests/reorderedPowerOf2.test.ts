import reorderedPowerOf2 from '../src/medium/reorderedPowerOf2';

describe('Test check for reorderedPowerOf2 question', () => {
	it('should return a boolean', () => {
		expect(typeof reorderedPowerOf2(1024)).toBe('boolean');
	});

	it('Should return correct value', () => {
		expect(reorderedPowerOf2(1204)).toStrictEqual(true);
	});
});
