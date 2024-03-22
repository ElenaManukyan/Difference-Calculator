import fs from 'fs';

const parseFile = (filepath) => {
  const path = filepath;
  // console.log(`path = ${path}`);
  const text = JSON.stringify(fs.readFileSync(path, 'utf8'));
  // console.log(`text = ${text}`);
  return text;
};

export default parseFile;
