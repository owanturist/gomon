/**
 * Gomon interface.
 * It represents a sequence of single and pair numbers
 * in a way to calculate the maximum sum between
 * (single numbers) + (multiplied numbers in pairs).
 *
 * @param sum represents the sum
 * @param sequence represents the sequence
 *
 * @example
 * {
 *     sum: 27, // === 0 + 1 + (2 * 3) + (4 * 5)
 *     sequence: [ 0, 1, [ 2, 3 ], [ 4, 5 ]]
 * }
 */
interface Gomon {
    sum: number;
    sequence: Array<number | [ number, number ]>;
}

/**
 * Calculate the left Gomon (-Infinity; 0] of an input.
 *
 * @param numbers sorted sequence of integers.
 */
const gomonLeft = (numbers: Array<number>): Gomon => {
    const acc: Gomon = {
        sum: 0,
        sequence: []
    };

    // goes from the start to the end
    let i = 1;

    while (true) {
        const prev = numbers[ i - 1 ];
        const current = numbers[ i ];

        // quit immideately when prev value is greater than 1
        if (prev === undefined || prev > 1) {
            return acc;
        }

        // add single prev value when current value is greater than 1
        if (current === undefined || current > 1) {
            acc.sum += prev;
            acc.sequence.push(prev);

            return acc;
        }

        // in case of 1 just add the previos one and 1 as singles
        if (current === 1) {
            acc.sum += (prev + 1);
            acc.sequence.push(prev, 1);

        // otherwise make a pair
        } else {
            acc.sum += (prev * current);
            acc.sequence.push([ prev, current ]);
        }

        i += 2;
    }
};

/**
 * Calculate the right Gomon (1, +Infinity) of an input.
 *
 * @param numbers sorted sequence of integers.
 */
const gomonRight = (numbers: Array<number>): Gomon => {
    const acc: Gomon = {
        sum: 0,
        sequence: []
    };

    // goes from the end to the start
    let i = numbers.length - 1;

    while (true) {
        const prev = numbers[ i - 1 ];
        const current = numbers[ i ];

        // quit immideately when current value is less or equal to 1
        if (current === undefined || current <= 1) {
            return acc;
        }

        // add single current value when prev is less or equal to 1
        if (prev === undefined || prev <= 1) {
            acc.sum += current;
            acc.sequence.unshift(current);

            return acc;
        }

        // the values are greater than 1
        acc.sum += (prev * current);
        acc.sequence.unshift([ prev, current ]);
        i -= 2;
    }
};

/**
 * Calculate a Gomon of an input.
 *
 * @param numbers sequence of integers.
 */
export const gomon = (numbers: Array<number>): Gomon => {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const left = gomonLeft(sorted);
    const right = gomonRight(sorted);

    return {
        sum: left.sum + right.sum,
        sequence: [ ...left.sequence, ...right.sequence ]
    };
};
