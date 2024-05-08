import path from 'node:path';
import process from 'node:process';
import parseFileJSON from './parseFileJSON.js';
import parseFileYAML from './parseFileYAML.js';


function chooseParser(filePath, format) {
  if (format === '.json') {
    const fileContent = parseFileJSON(filePath);
    return fileContent;
  }
  const fileContent = parseFileYAML(filePath);
  return fileContent;
}

function parsePaths(filepath) {
  const format = path.extname(String(filepath));
  //const format2 = path.extname(String(filepath2));
  const pathResolved = path.resolve(process.cwd(), String(filepath));
  //const path2 = path.resolve(process.cwd(), String(filepath2));
  const fileContent = chooseParser(pathResolved, format);
  return fileContent;
  //const fileContent2 = chooseParser(path2, format2);
  //const result = chooseFormatters(genDiff(fileContent1, fileContent2), formatName);
  //return result;
  //const strDiff = genDiff(fileContent1, fileContent2);
  //console.log(`strDiff= ${strDiff}`);
  //console.log(`JSON.stringify(strDiff)= ${JSON.stringify(strDiff)}`);
  /*const arrDiff = strDiff.split('\n').map((line) => {

  })*/
}

export default parsePaths;
