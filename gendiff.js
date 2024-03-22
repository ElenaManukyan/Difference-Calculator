#!/usr/bin/env node

import path from 'node:path';
import process from 'node:process';
import { program } from 'commander';
// eslint-disable-next-line import/extensions
import parseFile from './parseFile.js';

const filepath = (filepath1, filepath2) => {
  const result = {};
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);
  // console.log(`path1 = ${path1}, path2 = ${path2}`);
  const text1 = parseFile(path1);
  result.text1 = text1;
  const text2 = parseFile(path2);
  result.text2 = text2;
  // console.log(`text1 = ${JSON.stringify(text1)}, text2 = ${JSON.stringify(text2)}`);
  return console.log(result);
};

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action(filepath)
  .parse(process.argv);
