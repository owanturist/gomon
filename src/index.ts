interface Gomon {
    sum: number;
    sequence: Array<number | [ number, number ]>;
}

const gomonLeft = (numbers: Array<number>): Gomon => {
    const acc: Gomon = {
        sum: 0,
        sequence: []
    };

    let i = 1;

    while (true) {
        const prev = numbers[ i - 1 ];
        const current = numbers[ i ];

        if (prev === undefined || prev > 1) {
            return acc;
        }

        if (current === undefined || current > 1) {
            acc.sum += prev;
            acc.sequence.push(prev);

            return acc;
        }

        if (current === 1) {
            acc.sum += (prev + current);
            acc.sequence.push(prev, current);
        } else {
            acc.sum += (prev * current);
            acc.sequence.push([ prev, current ]);
        }

        i += 2;
    }
};

const gomonRight = (numbers: Array<number>): Gomon => {
    const acc: Gomon = {
        sum: 0,
        sequence: []
    };

    let i = numbers.length - 1;

    while (true) {
        const prev = numbers[ i - 1 ];
        const current = numbers[ i ];

        if (current === undefined || current <= 1) {
            return acc;
        }

        if (prev === undefined || prev <= 1) {
            acc.sum += current;
            acc.sequence.unshift(current);

            return acc;
        }

        acc.sum += (prev * current);
        acc.sequence.unshift([ prev, current ]);
        i -= 2;
    }
};

export const gomon = (numbers: Array<number>): Gomon => {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const left = gomonLeft(sorted);
    const right = gomonRight(sorted);

    return {
        sum: left.sum + right.sum,
        sequence: [ ...left.sequence, ...right.sequence ]
    };
};
