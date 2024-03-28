import { expect, test } from '@jest/globals';
// eslint-disable-next-line import/extensions
import parsePaths from '../src/parsePaths.js';

const answer = {
  '- follow': false,
  host: 'hexlet.io',
  '- proxy': '123.234.53.22',
  '- timeout': 50,
  '+ timeout': 20,
  '+ verbose': true,
};
test('parseFile', () => {
  expect(parsePaths('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(JSON.stringify(answer));
});
// __fixtures__/file1.json __fixtures__/file2.json ;
