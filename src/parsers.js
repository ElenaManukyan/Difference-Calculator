import path from 'node:path';
import process from 'node:process';
import fs from 'fs'; // or 'node:fs'
import yaml from 'js-yaml';
import chooseFormatters from '../formatters/index.js';
import genDiff from './genDiff.js';

const parseFileYAML = (filepath) => {
  const yamlFile = fs.readFileSync(filepath, 'utf8');
  const loadedYaml = yaml.load(yamlFile);
  return loadedYaml;
};

const parseFileJSON = (filepath) => {
  const text = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(text);
};

function parsers(filePath, format) {
  if (format === '.json') {
    const fileContent = parseFileJSON(filePath);
    return fileContent;
  }
  const fileContent = parseFileYAML(filePath);
  return fileContent;
}

function parsePaths(filepath1, filepath2, formatter = 'stylish') {
  const fileFormat1 = path.extname(String(filepath1));
  const pathResolved1 = path.resolve(process.cwd(), String(filepath1));
  const fileContent1 = parsers(pathResolved1, fileFormat1);
  // console.log(`fileContent1= ${JSON.stringify(fileContent1)}`);
  const fileFormat2 = path.extname(String(filepath2));
  const pathResolved2 = path.resolve(process.cwd(), String(filepath2));
  const fileContent2 = parsers(pathResolved2, fileFormat2);
  const difference = genDiff(fileContent1, fileContent2);
  // console.log(`typeof difference= ${Array.isArray(difference)}`);
  const result = chooseFormatters(difference, formatter);
  return result;
}

export default parsePaths;
