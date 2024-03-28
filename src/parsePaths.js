import path from 'node:path';
import process from 'node:process';
import parseFile from '../parseFile.js';
import genDiff from './genDiff.js';

function parsePaths(filepath1, filepath2) {
  const result = {};
  const path1 = path.resolve(process.cwd(), filepath1);
  console.log(`path1 = ${path1}`);
  const path2 = path.resolve(process.cwd(), filepath2);
  const fileContent1 = parseFile(path1);
  // console.log(`file1 = ${JSON.stringify(fileContent1)}`);
  result.file1 = fileContent1;
  const fileContent2 = parseFile(path2);
  result.file2 = fileContent2;
  return JSON.stringify(JSON.parse(genDiff(result.file1, result.file2)));
}

export default parsePaths;
