// import fs from 'fs';
const fs = require('fs');

const parseFile = (filepath) => {
  const path = filepath;
  console.log(typeof path);
  const text = fs.readFileSync(path, 'utf8');
  // console.log(JSON.parse(text));
  return JSON.stringify(text);
};

export default parseFile;
