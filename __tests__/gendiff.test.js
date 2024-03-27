import { expect, test } from '@jest/globals';
// eslint-disable-next-line import/extensions
import parseFile from '../src/gendiff.js';

const answer = {
  '- follow': false,
  host: 'hexlet.io',
  '- proxy': '123.234.53.22',
  '- timeout': 50,
  '+ timeout': 20,
  '+ verbose': true,
};
test('parseFile', () => {
  expect(parseFile('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(JSON.stringify(answer));
});
test('parseFile', () => {
  expect(parseFile('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(JSON.stringify(answer));
});
