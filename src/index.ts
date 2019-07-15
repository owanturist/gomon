export const gomon = (numbers: Array<number>): number => {
    const n = numbers.length;

    if (n === 0) {
        return 0;
    }

    if (n === 1) {
        return numbers[ 0 ];
    }

    const sorted = numbers.slice().sort((a, b) => a - b);
    let acc = 0;

    for (let i = 1; i < n; i++) {
        const prev = sorted[ i - 1];
        const current = sorted[ i ];
        let increment = 0;

        if (current <= 0) {
            acc += (prev * current);
            increment = 1;
        } else if (current === 1) {
            acc += (prev + current);
            increment = 1;
        } else if (prev <= 0 || prev === 1) {
            acc += prev;
        } else {
            acc += (prev * current);
            increment = 1;
        }

        i += increment;

        if (increment > 0 && i === n - 1) {
            acc += sorted[ i ];
        }
    }

    return acc;
};
