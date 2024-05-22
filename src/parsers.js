import fs from 'fs';
import yaml from 'js-yaml';

function parsers(filePath, format) {
  let fileContent;
  switch (format) {
    case '.json':
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return fileContent;
    case '.yml':
    case '.yaml':
      fileContent = yaml.load(fs.readFileSync(filePath, 'utf8'));
      return fileContent;
    default:
      throw new Error(`Element format ${format} doesn't exist`);
  }
}

export default parsers;
