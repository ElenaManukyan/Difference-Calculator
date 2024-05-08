import _ from 'lodash';
import parsePaths from './parsers.js';
import chooseFormatters from '../formatters/index.js';

/* function objectToString(obj, indent) {
  const indentation = indent.repeat(3);
  if (_.isPlainObject(obj)) {
    let result = '{\n';
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      if (result !== '{\n') {
        result += ', ';
      }
      result += `${indentation}${key}: ${obj[key]}`;
    });
    result += '\n}';
    return result;
  }
  return obj;
} */

function genDiffStylish(obj1, obj2, depth = 0) {
  if (_.isPlainObject(obj1) && _.isPlainObject(obj2)) {
    const keys1 = _.sortBy(Object.keys(obj1));
    const keys2 = _.sortBy(Object.keys(obj2));
    const unionKeys = _.sortBy(_.union(keys1, keys2));
    let locDepth;
    return unionKeys.map((key) => {
      const indentation = '  '.repeat(depth);
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        const nestedDiff = genDiffStylish(obj1[key], obj2[key], depth + 1);
        return `${indentation}  ${key}: {\n${nestedDiff}\n${indentation} }`;
      }
      if (obj1[key] === obj2[key]) {
        return `${indentation}  ${key}: ${obj1[key]}`;
      }
      if (keys1.includes(key) && keys2.includes(key)) {
        if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
          //genDiffStylish(obj1[key], obj2[key], depth + 1);
          //locDepth = depth + 4;
        }
        return `${indentation}- ${key}: ${JSON.stringify(obj1[key], null, 2).replace(/"/g, '')}\n${indentation}+ ${key}: ${JSON.stringify(obj2[key], null, 5).replace(/"/g, '')}`;
      }
      if (!keys1.includes(key) && keys2.includes(key)) {
        if (_.isPlainObject(obj2[key])) {
          //genDiffStylish(obj1[key], obj2[key], depth + 1);
          //locDepth = depth + 4;
        }
        return `${indentation}+ ${key}: ${JSON.stringify(obj2[key], null, 2).replace(/"/g, '')}`;
      }
      if (_.isPlainObject(obj1[key])) {
        //locDepth = depth + 4;
      }
      return `${indentation}- ${key}: ${JSON.stringify(obj1[key], null, 2).replace(/"/g, '')}`;
    }).join('\n');
  }
  return '';
}

function genDiffFlatStructure(obj1, obj2) {
  if (_.isPlainObject(obj1) && _.isPlainObject(obj2)) {
    const keys1 = _.sortBy(Object.keys(obj1));
    const keys2 = _.sortBy(Object.keys(obj2));
    const unionKeys = _.union(keys1, keys2);
    return _.sortBy(unionKeys.map((key) => {
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        return {
          key,
          type: 'nested',
          value: _.sortBy(genDiffFlatStructure(obj1[key], obj2[key]), 'key'),
        };
      } if (obj1[key] === obj2[key]) {
        return {
          key,
          type: 'unchanged',
          value: obj1[key],
        };
      } if (
        obj1[key] !== obj2[key]
        && keys1.includes(key)
        && keys2.includes(key)
      ) {
        return {
          key,
          type: 'changed',
          value: obj2[key],
          prevValue: obj1[key],
        };
      } if (!keys1.includes(key) && keys2.includes(key)) {
        return {
          key,
          type: 'added',
          value: obj2[key],
        };
      }
      return {
        key,
        type: 'removed',
        value: obj1[key],
      };
    }), 'key');
  }
  return [];
}

function genDiff(filepath1, filepath2, formatter = 'stylish') {
  const fileContent1 = parsePaths(filepath1);
  const fileContent2 = parsePaths(filepath2);
  if (formatter === 'stylish') {
    return genDiffStylish(fileContent1, fileContent2);
  }
  if (formatter === 'plain') {
    return chooseFormatters(genDiffFlatStructure(fileContent1, fileContent2), formatter);
  }
  return chooseFormatters(genDiffFlatStructure(fileContent1, fileContent2), formatter);
}

export default genDiff;
