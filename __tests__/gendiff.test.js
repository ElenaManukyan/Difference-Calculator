// import { test, expect } from '@jest/globals';
// eslint-disable-next-line import/extensions
import genDiff from '../src/gendiff.js';

const answer = {
  '- follow': false,
  host: 'hexlet.io',
  '- proxy': '123.234.53.22',
  '- timeout': 50,
  '+ timeout': 20,
  '+ verbose': true,
};

// eslint-disable-next-line no-undef
test('genDiff', () => {
  // eslint-disable-next-line no-undef
  expect(genDiff('../__fixtures__/file1.json', '../__fixtures__/file2.json')).toEqual(JSON.stringify(answer));
});
