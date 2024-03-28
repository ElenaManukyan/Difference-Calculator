#!/usr/bin/env node
import process from 'node:process';
import { program } from 'commander';
import parsePaths from './parsePaths.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  // .arguments('<filepaths...>')
  .option('-f, --format [type]', 'output format')
  .action(parsePaths(filepath1, filepath2))
  .parse(process.argv);

export default parsePaths;
