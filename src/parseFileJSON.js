import fs from 'fs';

const parseFileJSON = (filepath) => {
  const path = filepath;
  const text = fs.readFileSync(path, 'utf8');
  return JSON.parse(text);
};

export default parseFileJSON;
