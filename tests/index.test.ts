import test from 'ava';

import {
    gomon
} from '../src';

test('Empty input array', t => {
    t.is(gomon([]), 0);
});
