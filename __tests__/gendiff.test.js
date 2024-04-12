/* eslint-disable max-len */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
import { expect, test } from '@jest/globals';
import parsePaths from '../src/parsers.js';

/* команды для запуска приложения вручную:
2FlatJSONFiles.cast
Creating difference between 2 flat .json files
node src/genDiffMain.js /home/elena/frontend-project-46/__fixtures__/file1.json /home/elena/frontend-project-46/__fixtures__/file2.json

2FlatYAMLFiles.cast
Creating difference between 2 flat .yml files
node src/genDiffMain.js /home/elena/frontend-project-46/__fixtures__/file1.yml /home/elena/frontend-project-46/__fixtures__/file2.yml

2NestedJSONFiles.cast
Creating difference between 2 nested .json files
node src/genDiffMain.js /home/elena/frontend-project-46/__fixtures__/file1_nested.json /home/elena/frontend-project-46/__fixtures__/file2_nested.json

2NestedYAMLFiles.cast
Creating difference between 2 nested .yml files
node src/genDiffMain.js /home/elena/frontend-project-46/__fixtures__/file1_nested.yml /home/elena/frontend-project-46/__fixtures__/file2_nested.yml

2NestedJSONFilesFormatPlain.cast
Creating difference between 2 nested .json files with '--format' parameter
node src/genDiffMain.js --format plain /home/elena/frontend-project-46/__fixtures__/file1_nested.json /home/elena/frontend-project-46/__fixtures__/file2_nested.json

2NestedYAMLFilesFormatPlain.cast
Creating difference between 2 nested .yml files with '--format' parameter
node src/genDiffMain.js --format plain /home/elena/frontend-project-46/__fixtures__/file1_nested.yml /home/elena/frontend-project-46/__fixtures__/file2_nested.yml
*/

/* const answerJSON = {
  '- follow': false,
  '  host': 'hexlet.io',
  '- proxy': '123.234.53.22',
  '- timeout': 50,
  '+ timeout': 20,
  '+ verbose': true,
}; */

const answerNestedJSON = {
  common: {
    '+ follow': false,
    '  setting1': 'Value 1',
    '- setting2': 200,
    '- setting3': true,
    '+ setting3': null,
    '+ setting4': 'blah blah',
    '+ setting5': {
          key5: 'value5'
      },
      setting6: {
          doge: {
            '- wow': '',
            '+ wow': 'so much'
          },
        '  key': 'value',
        '+ ops': 'vops'
      }
  },
  group1: {
    '- baz': 'bas',
    '+ baz': 'bars',
    '  foo': 'bar',
    '- nest': {
          key: 'value'
      },
    '+ nest': 'str'
  },
'- group2': {
      abc: 12345,
      deep: {
          id: 45
      }
  },
'+ group3': {
      deep: {
          id: {
              number: 45
          }
      },
      fee: 100500
  }
};

const answerPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

test('Make difference nested structures JSON', () => {
  expect(parsePaths('./__fixtures__/file1_nested.json', './__fixtures__/file2_nested.json', 'stylish')).toEqual(answerNestedJSON);
});
test('Make difference nested structures YAML', () => {
  expect(parsePaths('./__fixtures__/file1_nested.yml', './__fixtures__/file2_nested.yml', 'stylish')).toEqual(answerNestedJSON);
});
test('Make difference nested structures JSON with format plain', () => {
  expect(parsePaths('./__fixtures__/file1_nested.json', './__fixtures__/file2_nested.json', 'plain')).toEqual(answerPlain);
});
