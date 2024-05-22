import path from 'path';
import process from 'node:process';
import chooseFormatters from '../formatters/index.js';
import genDiff from './genDiff.js';
import parsers from './parsers.js';

function parsePaths(filepath1, filepath2, formatter = 'stylish') {
  const fileFormat1 = path.extname(filepath1);
  const pathResolved1 = path.resolve(process.cwd(), String(filepath1));
  const fileContent1 = parsers(pathResolved1, fileFormat1);
  const fileFormat2 = path.extname(filepath2);
  const pathResolved2 = path.resolve(process.cwd(), String(filepath2));
  const fileContent2 = parsers(pathResolved2, fileFormat2);
  const difference = genDiff(fileContent1, fileContent2);
  const result = chooseFormatters(difference, formatter);
  return result;
}

export default parsePaths;
