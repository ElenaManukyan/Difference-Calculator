import path from 'node:path';
import process from 'node:process';
import parseFileJSON from './parseFileJSON.js';
import genDiff from './genDiff.js';
import parseFileYAML from './parseFileYAML.js';

function parsePaths(filepath1, filepath2) {
  let result = {};
  const parse = {};
  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);
  if (format1 === '.json' && format2 === '.json') {
    const fileContent1 = parseFileJSON(path1);
    parse.file1 = fileContent1;
    const fileContent2 = parseFileJSON(path2);
    parse.file2 = fileContent2;
    result = JSON.stringify(JSON.parse(genDiff(parse.file1, parse.file2)));
  }
  if ((format1 === '.yml' && format2 === '.yml') || (format1 === '.yaml' && format2 === '.yaml')) {
    const fileContent1 = parseFileYAML(path1);
    parse.file1 = fileContent1;
    const fileContent2 = parseFileYAML(path2);
    parse.file2 = fileContent2;
    result = JSON.stringify(JSON.parse(genDiff(parse.file1, parse.file2)));
  }
  return result;
}

const file1 = './__fixtures__/file1.yml';
const file2 = './__fixtures__/file2.yml';
console.log(JSON.parse(parsePaths(file1, file2)));

export default parsePaths;
