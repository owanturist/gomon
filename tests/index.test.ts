import test from 'ava';

import {
    gomon
} from '../src';

test('#1 Empty', t => {
    t.deepEqual(gomon([]), {
        sum: 0,
        sequence: []
    });
});

test('#2 Single number', t => {
    t.deepEqual(gomon([ -99 ]), {
        sum: -99,
        sequence: [ -99 ]
    });

    t.deepEqual(gomon([ -1 ]), {
        sum: -1,
        sequence: [ -1 ]
    });

    t.deepEqual(gomon([ 0 ]), {
        sum: 0,
        sequence: [ 0 ]
    });

    t.deepEqual(gomon([ 1 ]), {
        sum: 1,
        sequence: [ 1 ]
    });

    t.deepEqual(gomon([ 99 ]), {
        sum: 99,
        sequence: [ 99 ]
    });
});

test('#3 Two numbers', t => {
    t.deepEqual(gomon([ 0, 0 ]), {
        sum: 0,
        sequence: [[ 0, 0 ]]
    });

    t.deepEqual(gomon([ -1, 0 ]), {
        sum: 0,
        sequence: [[ -1, 0 ]]
    });

    t.deepEqual(gomon([ 0, 1 ]), {
        sum: 1,
        sequence: [ 0, 1 ]
    });

    t.deepEqual(gomon([ -1, 1 ]), {
        sum: 0,
        sequence: [ -1, 1 ]
    });

    t.deepEqual(gomon([ -1, -1 ]), {
        sum: 1,
        sequence: [[ -1, -1 ]]
    });

    t.deepEqual(gomon([ 1, 1 ]), {
        sum: 2,
        sequence: [ 1, 1 ]
    });
});

test('#4 Sequences', t => {
    t.deepEqual(gomon([ 0, 1, 2, 3, 4, 5 ]), {
        sum: 27,
        sequence: [ 0, 1, [ 2, 3 ], [ 4, 5 ]]
    });

    t.deepEqual(gomon([ -5, -4, -3, -2, -1, 0 ]), {
        sum: 26,
        sequence: [[ -5, -4, ], [ -3, -2 ], [ -1, 0 ]]
    });

    t.deepEqual(gomon([ -5, -4, -3, -2, -1, 1, 2, 3, 4, 5 ]), {
        sum: 52,
        sequence: [[ -5, -4, ], [ -3, -2 ], -1, 1, [ 2, 3 ], [ 4, 5 ]]
    });

    t.deepEqual(gomon([ -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5 ]), {
        sum: 53,
        sequence: [[ -5, -4, ], [ -3, -2 ], [ -1, 0 ], 1, [ 2, 3 ], [ 4, 5 ]]
    });

    t.deepEqual(gomon([ -5, -4, -3, -2, -1, 0, 0, 1, 2, 3, 4, 5 ]), {
        sum: 53,
        sequence: [[ -5, -4, ], [ -3, -2 ], [ -1, 0 ], 0, 1, [ 2, 3 ], [ 4, 5 ]]
    });
});

test('#5 Duplicates', t => {
    t.deepEqual(gomon([ 1, 1, 2, 2, 3, 3, 4, 4, 5, 5 ]), {
        sum: 56,
        sequence: [ 1, 1, [ 2, 2 ], [ 3, 3 ], [ 4, 4 ], [ 5, 5 ]]
    });

    t.deepEqual(gomon([ -1, -1, -2, -2, -3, -3, -4, -4, -5, -5 ]), {
        sum: 55,
        sequence: [[ -5, -5 ], [ -4, -4 ], [ -3, -3 ], [ -2, -2 ], [ -1, -1 ]]
    });
});

test('#6 Shuffled', t => {
    t.deepEqual(gomon([ 5, 1, 4, 0, 3, 2 ]), {
        sum: 27,
        sequence: [ 0, 1, [ 2, 3 ], [ 4, 5 ]]
    });

    t.deepEqual(gomon([ -5, -1, -4, 0, -3, -2 ]), {
        sum: 26,
        sequence: [[ -5, -4 ], [ -3, -2 ], [ -1, 0 ]]
    });

    t.deepEqual(gomon([ 1, -1, 2, -2, 3, -3, 4, -4, 5, -5 ]), {
        sum: 52,
        sequence: [[ -5, -4, ], [ -3, -2 ], -1, 1, [ 2, 3 ], [ 4, 5 ]]
    });
});

test('#7 Only 1|-1', t => {
    t.deepEqual(gomon([ 1 ]), {
        sum: 1,
        sequence: [ 1 ]
    });

    t.deepEqual(gomon([ 1, 1 ]), {
        sum: 2,
        sequence: [ 1, 1 ]
    });

    t.deepEqual(gomon([ 1, 1, 1 ]), {
        sum: 3,
        sequence: [ 1, 1, 1 ]
    });

    t.deepEqual(gomon([ 1, 1, 1, 1 ]), {
        sum: 4,
        sequence: [ 1, 1, 1, 1 ]
    });


    t.deepEqual(gomon([ -1 ]), {
        sum: -1,
        sequence: [ -1 ]
    });

    t.deepEqual(gomon([ -1, -1 ]), {
        sum: 1,
        sequence: [[ -1, -1 ]]
    });

    t.deepEqual(gomon([ -1, -1, -1 ]), {
        sum: 0,
        sequence: [[ -1, -1 ], -1 ]
    });

    t.deepEqual(gomon([ -1, -1, -1, -1 ]), {
        sum: 2,
        sequence: [[ -1, -1 ], [ -1, -1 ] ]
    });
});

test('#8 transition between negative and 1 thru 0', t => {
    t.deepEqual(gomon([ -1, 0, 1 ]), {
        sum: 1,
        sequence: [[ -1, 0 ], 1 ]
    });

    t.deepEqual(gomon([ -1, -1, 0, 1 ]), {
        sum: 2,
        sequence: [[ -1, -1 ], 0, 1 ]
    });

    t.deepEqual(gomon([ -1, 0, 0, 1 ]), {
        sum: 1,
        sequence: [[ -1, 0 ], 0, 1 ]
    });

    t.deepEqual(gomon([ -1, 0, 1, 1 ]), {
        sum: 2,
        sequence: [[ -1, 0 ], 1, 1 ]
    });

    t.deepEqual(gomon([ -1, -1, 0, 0, 1, 1 ]), {
        sum: 3,
        sequence: [[ -1, -1 ], [ 0, 0 ], 1, 1 ]
    });

    t.deepEqual(gomon([ -1, -1, -1, 0, 0, 0, 1, 1, 1 ]), {
        sum: 4,
        sequence: [[ -1, -1 ], [ -1, 0 ], [ 0, 0 ], 1, 1, 1 ]
    });
});

test('#9 Big intervals', t => {
    t.deepEqual(gomon([ -100, -30, 0, 50, 200 ]), {
        sum: 13000,
        sequence: [[ -100, -30 ], 0, [ 50, 200 ]]
    });
});
