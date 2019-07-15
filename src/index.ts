export const gomon = (numbers: Array<number>): number => {
    const sorted = numbers.slice().sort((a, b) => a - b);
    let acc = 0;
    let i = 1;

    while (true) {
        const prev = sorted[ i - 1 ] || 0;
        const current = sorted[ i ];

        if (current === undefined) {
            return acc + prev;
        }

        if (prev <= 1 && current > 1) {
            acc += prev;
            i += 1;
        } else if (current === 1) {
            acc += (prev + current);
            i += 2;
        } else {
            acc += (prev * current);
            i += 2;
        }
    }
};
