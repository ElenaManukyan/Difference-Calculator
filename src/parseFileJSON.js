import fs from 'fs';

const parseFileJSON = (filepath) => {
  const path = filepath;
  // console.log(`path = ${path}`);
  const text = fs.readFileSync(path, 'utf8');
  // console.log(`text = ${JSON.parse(text)}`);
  return JSON.parse(text);
};

export default parseFileJSON;
