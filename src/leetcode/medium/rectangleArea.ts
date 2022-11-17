/**
    * desc: Given the coordinates of two rectilinear rectangles in a 2D plane, return the total area covered by the two rectangles.

    The first rectangle is defined by its bottom-left corner (ax1, ay1) and its top-right corner (ax2, ay2).

    The second rectangle is defined by its bottom-left corner (bx1, by1) and its top-right corner (bx2, by2).

    Example 1: =>
    Rectangle Area
    Input: ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2
    Output: 45
    
    Example 2: =>
    Input: ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2
    Output: 16

    Constraints: =>
    -104 <= ax1 <= ax2 <= 104
    -104 <= ay1 <= ay2 <= 104
    -104 <= bx1 <= bx2 <= 104
    -104 <= by1 <= by2 <= 104
 */

/**
 *
 * @param ax1 number
 * @param ay1 number
 * @param ax2 number
 * @param ay2 number
 * @param bx1 number
 * @param by1 number
 * @param bx2 number
 * @param by2 number
 * @returns number
 */
const computeArea = (
	ax1: number,
	ay1: number,
	ax2: number,
	ay2: number,
	bx1: number,
	by1: number,
	bx2: number,
	by2: number
): number => {
	// Area covered by two rectangles = (Area of 1st rectangle + Area of second rectangle) - Area of intersect

	// area of rectangle R1.....l * b
	const areaOfR1: number = (ax2 - ax1) * (ay2 - ay1);

	// area of rectangle R2.....l * b
	const areaOfR2: number = (bx2 - bx1) * (by2 - by1);

	// area of intersecting part
	let areaOfIntersect: number =
		(Math.min(ax2, bx2) - Math.max(ax1, bx1)) *
		(Math.min(ay2, by2) - Math.max(ay1, by1));

	// check the boundaries of both rectangles to see if they are really overlapping, is not set to 0 automatically
	if (bx1 >= ax2 || ax1 >= bx2 || by1 >= ay2 || ay1 >= by2) {
		areaOfIntersect = 0;
	}

	return areaOfR1 + areaOfR2 - areaOfIntersect;
};
