import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

function parsers(filePath) {
  const format = path.extname(filePath);
  let fileContent;
  switch (format) {
    case '.json':
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return fileContent;
    case '.yml':
      fileContent = yaml.load(fs.readFileSync(filePath, 'utf8'));
      return fileContent;
    default:
      throw new Error(`Element format ${format} doesn't exist`);
  }
}

export default parsers;
