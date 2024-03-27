#!/usr/bin/env node

import path from 'node:path';
import process from 'node:process';
import { program } from 'commander';
import _ from 'lodash';
// eslint-disable-next-line import/extensions
import parseFile from '../parseFile.js';

const genDiff = (file1, file2) => {
  const content1 = _.sortBy(Object.entries(file1));
  const content2 = _.sortBy(Object.entries(file2));
  const keys1 = _.sortBy(Object.keys(file1));
  const keys2 = _.sortBy(Object.keys(file2));
  const values2 = Object.values(file2);
  const result = {};
  for (let i = 0; i < content1.length; i += 1) {
    const [key1, val1] = content1[i];
    if (keys2.includes(key1)) {
      const indexOfKey2 = keys2.indexOf(key1);
      if (values2.includes(val1)) {
        result[key1] = val1;
      } else {
        result[`- ${key1}`] = val1;
        const [key2, value2] = content2[indexOfKey2];
        result[`+ ${key2}`] = value2;
      }
    } else {
      result[`- ${key1}`] = val1;
    }
  }
  for (let j = 0; j < content2.length; j += 1) {
    const [key2, val2] = content2[j];
    if (!keys1.includes(key2)) {
      result[`+ ${key2}`] = val2;
    }
  }
  return JSON.stringify(result);
};

const parsePaths = (filepath1, filepath2) => {
  const result = {};
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);
  const fileContent1 = parseFile(path1);
  console.log(`file1 = ${JSON.stringify(fileContent1)}`);
  result.file1 = fileContent1;
  const fileContent2 = parseFile(path2);
  result.file2 = fileContent2;
  return JSON.parse(genDiff(result.file1, result.file2));
};

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  // .arguments('<filepaths...>')
  .option('-f, --format [type]', 'output format')
  .action(parsePaths)
  .parse(process.argv);

export default parsePaths;
