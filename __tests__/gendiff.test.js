import { expect, test } from '@jest/globals';
// eslint-disable-next-line import/no-unresolved
import parsePaths from '../src/parsers.js';
// import genDiffMain from '../src/genDiffMain.js';

const answerJSON = {
  '- follow': false,
  host: 'hexlet.io',
  '- proxy': '123.234.53.22',
  '- timeout': 50,
  '+ timeout': 20,
  '+ verbose': true,
};

test('parseFile .json format:', () => {
  expect(parsePaths('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(JSON.stringify(answerJSON));
});
test('parseFile .yml & .yaml formats:', () => {
  expect(parsePaths('./__fixtures__/file1.yml', './__fixtures__/file2.yml')).toEqual(JSON.stringify(answerJSON));
});
