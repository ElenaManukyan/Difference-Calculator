import _ from 'lodash';
import path from 'node:path';
import parseFileJSON from './parseFileJSON.js';

// Сделай genDiff рекурсивной функцией для проверки
// вложенных структур
const genDiff = (file1, file2) => {
  const result = {};
  // const entries1 = Object.entries(file1);
  // console.log(Object.prototype.hasOwnProperty.call(file2, 'group3'));
  // const entries2 = Object.entries(file2);
  // if (file1 !== null && file2 !== null) {
  const keys1 = Object.keys(file1);
  console.log(`keys1 = ${keys1}`);
  const keys2 = Object.keys(file2);
  console.log(`keys2 = ${keys2}`);

  // Если ключи есть в 2-х массивах;
  const filteredKeys = keys1.filter((key1) => keys2.includes(key1));
  // console.log(`filteredKeys = ${filteredKeys}`);

  for (let i = 0; i < keys1.length; i += 1) {
    if (file1) {

    }
  }
  /* const content1 = _.sortBy(Object.entries(file1));
  const content2 = _.sortBy(Object.entries(file2));
  const keys1 = _.sortBy(Object.keys(file1));
  const keys2 = _.sortBy(Object.keys(file2));
  // console.log(`keys2 = ${keys2}`);
  const result = {};
  let i;
  for (let j = 0; j < content1.length; j += 1) {
    const [key] = content1[j];
    if () {

    }
    i = file1[key];
    if (typeof i === 'object') {
      const keysLocal = Object.keys(i);
      for (let k = 0; k < keysLocal.length; k += 1) {
        const keyLocal = keysLocal[k];
        // console.log(`keyLocal = ${keyLocal}`);
        if (keys2.includes(keyLocal)) {
          if (i[keyLocal] === content2[content1.indexOf(i[keyLocal])]) {
            result[keyLocal] = i[keyLocal];
          } else {
            result[`- ${keyLocal}`] = i[keyLocal];
            result[`+ ${keyLocal}`] = i[keyLocal];
          }
        }
      }
      console.log(`keys2 = ${keys2}`);
      genDiff(i, file2);
    }
  }
  let i2;
  for (let j2 = 0; j2 < content2.length; j2 += 1) {
    const [key2, val2] = content2[j2];
    i2 = file2[key2];
    if (typeof i2 === 'object' && i2 !== null) {
      const keysLocal2 = Object.keys(i2);
      for (let k2 = 0; k2 < keysLocal2.length; k2 += 1) {
        const keyLocal2 = keysLocal2[k2];
        if (!keys1.includes(keyLocal2)) {
          result[`+ ${key2}`] = val2;
        }
      }
      // genDiff(file1, i2);
    }
  } */
  return result; // Возвращается объект (было JSON.stringify())
};

// let result = {};
const parse = {};
// const format1 = path.extname('./__fixtures__/file1_nested.json');
// const format2 = path.extname('./__fixtures__/file2_nested.json');
const path1 = path.resolve(process.cwd(), './__fixtures__/file1_nested.json');
// console.log(`path1 = ${path1}`);
const path2 = path.resolve(process.cwd(), './__fixtures__/file2_nested.json');
const fileContent1 = parseFileJSON(path1);
parse.file1 = fileContent1;
const fileContent2 = parseFileJSON(path2);
parse.file2 = fileContent2;
// result = JSON.stringify(JSON.parse(genDiff(parse.file1, parse.file2)));

const stylish = (obj, depth = 1) => {
  let i;
  let level = depth;
  let keys;
  if (obj !== null) {
    keys = Object.keys(obj);
    for (let j = 0; j < keys.length; j += 1) {
      const key = keys[j];
      i = obj[key];
      if (typeof i === 'object') {
        level += 1;
        stylish(i);
      }
    }
  }
  return level;
};

const genDiffResult = genDiff(parse.file1, parse.file2);
console.log(JSON.stringify(genDiffResult, null, stylish(genDiffResult)));

export { genDiff, stylish };
