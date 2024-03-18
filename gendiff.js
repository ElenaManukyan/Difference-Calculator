#!/usr/bin/env node

import { program } from 'commander';

import { cwd } from 'node:process';

import { parse } from 'node:path';

// console.log(`Current directory: ${cwd()}`);

const filepath = (filepath1, filepath2) => {
  const result = {};
  let path1 = filepath1;
  let path2 = filepath2;
  if (!filepath1.includes(`${cwd()}`)) {
    path1 = `${cwd()}/${filepath1}`;
  } else if (filepath1.includes(`${cwd()}`)) {
    path1 = filepath1;
  }
  if (!filepath2.includes(`${cwd()}`)) {
    path2 = `${cwd()}/${filepath2}`;
  } else if (filepath2.includes(`${cwd()}`)) {
    path2 = filepath2;
  }
  console.log(`path1 = ${path1}, path2 = ${path2}`);
  const text1 = parse(path1);
  result.text1 = text1;
  const text2 = parse(path2);
  result.text2 = text2;
  console.log(`text1 = ${JSON.stringify(text1)}, text2 = ${JSON.stringify(text2)}`);
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
