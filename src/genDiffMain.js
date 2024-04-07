#!/usr/bin/env node
import process from 'node:process';
import { program } from 'commander';
import parsePaths from './parsers.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish.js')
  .action((file1, file2) => console.log(parsePaths(file1, file2)))
  .parse(process.argv);
