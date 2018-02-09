import test from 'ava';
import { addOne } from '../src/js/index';

test('addOne', (t) => {
  const num = 1;
  t.deepEqual(addOne(num), num + 1);
});
