import fs from 'fs';

const parse = (filepath) => {
  const path = filepath;
  const text = fs.readFileSync(`${path}`, 'utf8');
  // return console.log(JSON.parse(text));
  return text;
};

export default parse;
