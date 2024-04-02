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

const answerNestedJSON = {
  common: {
    '+ follow': false,
    setting1: 'Value 1',
    '- setting2': 200,
    '- setting3': true,
    '+ setting3': null,
    '+ setting4': 'blah blah',
    '+ setting5': {
      key5: 'value5',
    },
    setting6: {
      doge: {
        '- wow': '',
        '+ wow': 'so much',
      },
      key: 'value',
      '+ ops': 'vops',
    },
  },
  group1: {
    '- baz': 'bas',
    '+ baz': 'bars',
    foo: 'bar',
    '- nest': {
      key: 'value',
    },
    '+ nest': 'str',
  },
  '- group2': {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
  '+ group3': {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

test('parseFile .json format:', () => {
  expect(parsePaths('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(JSON.stringify(answerJSON));
});
test('parseFile .yml & .yaml formats:', () => {
  expect(parsePaths('./__fixtures__/file1.yml', './__fixtures__/file2.yml')).toEqual(JSON.stringify(answerJSON));
});
test('Make difference nested structures JSON', () => {
  expect(parsePaths('./__fixtures__/file1_nested.json', './__fixtures__/file2_nested.json')).toEqual(JSON.stringify(answerNestedJSON));
});
test('Make difference nested structures YAML', () => {
  expect(parsePaths('./__fixtures__/file1_nested.yaml', './__fixtures__/file2_nested.yaml')).toEqual(JSON.stringify(answerNestedJSON));
});
