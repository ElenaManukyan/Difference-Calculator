#!/usr/bin/env node

/* const { program } = require('commander');
const { cwd } = require('node:process');
const path = require('node:path');
const { parse } = require('./parse'); */
// import commonjsVariables from 'commonjs-variables-for-esmodules';
// import path from 'node:path';

/* eslint import/no-unresolved: [2, { commonjs: true }] */

// import cwd from 'node:process';

// import program from 'commander';
// eslint-disable-next-line import/no-unresolved
// import { parseFile } from 'parseFile.js';

const path = require('node:path');
const process = require('node:process');
const program = require('commander');
const parseFile = require('./parseFile.cjs');

// console.log(`Current directory: ${cwd()}`);

const filepath = (filepath1, filepath2) => {
  const result = {};
  // let path1 = filepath1;
  // let path2 = filepath2;
  const path1 = path.resolve(filepath1, process.cwd());
  const path2 = path.resolve(filepath2, process.cwd());
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
