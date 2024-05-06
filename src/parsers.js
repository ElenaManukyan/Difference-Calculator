import path from 'node:path';
import process from 'node:process';
import genDiff from './genDiff.js';
import parseFileJSON from './parseFileJSON.js';
import parseFileYAML from './parseFileYAML.js';
import chooseFormatters from '../formatters/index.js';

function chooseParser(filePath, format) {
  if (format === '.json') {
    const fileContent = parseFileJSON(filePath);
    return fileContent;
  }
  const fileContent = parseFileYAML(filePath);
  return fileContent;
}

function parsePaths(filepath1, filepath2, formatName = 'stylish') {
  const format1 = path.extname(String(filepath1));
  const format2 = path.extname(String(filepath2));
  const path1 = path.resolve(process.cwd(), String(filepath1));
  const path2 = path.resolve(process.cwd(), String(filepath2));
  const fileContent1 = chooseParser(path1, format1);
  const fileContent2 = chooseParser(path2, format2);
  const result = chooseFormatters(genDiff(fileContent1, fileContent2), formatName);
  return result;
}

export default parsePaths;
