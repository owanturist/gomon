interface Gomon {
    sum: number;
    sequence: Array<number | [ number, number ]>;
}

export const gomon = (numbers: Array<number>): Gomon => {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const acc: Gomon = {
        sum: 0,
        sequence: []
    };
    let i = 1;

    while (true) {
        const prev = sorted[ i - 1 ];
        const current = sorted[ i ];

        if (prev === undefined) {  // i - 1 is out of range - quit
            return acc;
        }

        if (current === undefined) {  // i is out of range - quit
            acc.sum += prev;
            acc.sequence.push(prev);

            return acc;
        }

        if (prev <= 1 && current >= 1) {  // never make pairs between
            acc.sum += prev;              // (-Infinity, 1] and [1, +Infinity]
            acc.sequence.push(prev);      // prev is adding as single
            i += 1;                       // then current'll become prev

        } else if (current === 1) {            // 1 must always be added as single
            acc.sum += (prev + current);
            acc.sequence.push(prev, current);  // prev is adding as single as well
            i += 2;                            // and then jump to the next pair

        } else {
            acc.sum += (prev * current);
            acc.sequence.push([ prev, current ]);  // in other cases make a pair
            i += 2;                                // and jump to the next pair
        }
    }
};
