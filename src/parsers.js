import path from 'node:path';
import process from 'node:process';
import genDiff from './genDiff.js';
import parseFileJSON from './parseFileJSON.js';
import parseFileYAML from './parseFileYAML.js';
import chooseFormatters from '../formatters/index.js';

function parsePaths(filepath1, filepath2, formatName) {
  let result = {};
  const parse = {};
  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);
  if (formatName === 'plain') {
    const fileContent1 = parseFileJSON(path1);
    parse.file1 = fileContent1;
    const fileContent2 = parseFileJSON(path2);
    parse.file2 = fileContent2;
    result = chooseFormatters(genDiff(parse.file1, parse.file2, formatName), formatName);
  } else {
    if (format1 === '.json' && format2 === '.json') {
      const fileContent1 = parseFileJSON(path1);
      parse.file1 = fileContent1;
      const fileContent2 = parseFileJSON(path2);
      parse.file2 = fileContent2;
      result = chooseFormatters(genDiff(parse.file1, parse.file2, formatName), formatName);
    }
    if ((format1 === '.yml' && format2 === '.yml') || (format1 === '.yaml' && format2 === '.yaml')) {
      const fileContent1 = parseFileYAML(path1);
      parse.file1 = fileContent1;
      const fileContent2 = parseFileYAML(path2);
      parse.file2 = fileContent2;
      result = chooseFormatters(genDiff(parse.file1, parse.file2, formatName), formatName);
    }
  }
  return result;
}

export default parsePaths;
