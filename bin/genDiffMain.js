#!/usr/bin/env node
import process from 'node:process';
import { program } from 'commander';
import parsePaths from '../src/parsers.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <format>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const format = options.format || 'stylish';
    console.log(parsePaths(filepath1, filepath2, format));
  })
  .parse(process.argv);
