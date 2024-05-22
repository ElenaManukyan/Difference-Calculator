import path from 'path';
import process from 'node:process';
import chooseFormatters from '../formatters/index.js';
import genDiff from './genDiff.js';
import parsers from './parsers.js';

function parsePaths(filepath1, filepath2, formatter = 'stylish') {
  const pathResolved1 = path.resolve(process.cwd(), String(filepath1));
  const fileContent1 = parsers(pathResolved1);
  const pathResolved2 = path.resolve(process.cwd(), String(filepath2));
  const fileContent2 = parsers(pathResolved2);
  const difference = genDiff(fileContent1, fileContent2);
  const result = chooseFormatters(difference, formatter);
  return result;
}

export default parsePaths;
