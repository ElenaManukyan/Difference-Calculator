import _ from 'lodash';

function stringifyValue(value, levelOfDepth) {
  if (_.isPlainObject(value)) {
    const indent = ' '.repeat(4 * (levelOfDepth + 1));
    const closingIndent = ' '.repeat(4 * levelOfDepth);
    const entries = Object.entries(value).map(([key, val]) => {
      const formattedValue = _.isPlainObject(val) ? stringifyValue(val, levelOfDepth + 1) : val;
      return `${indent}${key}: ${formattedValue}`;
    }).join('\n');
    return `{\n${entries}\n${closingIndent}}`;
  }
  return value;
}

function stylish(list) {
  function innerFunc(listOfDifference, levelOfDepth) {
    let res = '';
    const countedSpaces = ' '.repeat(4 * levelOfDepth);
    listOfDifference.forEach((element) => {
      switch (element.type) {
        case 'nested':
          res += `${countedSpaces}${element.key}: {\n`;
          res += `${innerFunc(stringifyValue(element.value, levelOfDepth), levelOfDepth + 1)}`;
          res += `${countedSpaces}}\n`;
          break;
        case 'added':
          res += `${countedSpaces.slice(0, -2)}+ ${element.key}: ${stringifyValue(element.value, levelOfDepth)}\n`;
          break;
        case 'unchanged':
          res += `${countedSpaces.slice(0, -2)}  ${element.key}: ${stringifyValue(element.value, levelOfDepth)}\n`;
          break;
        case 'removed':
          res += `${countedSpaces.slice(0, -2)}- ${element.key}: ${stringifyValue(element.value, levelOfDepth)}\n`;
          break;
        case 'changed':
          res += `${countedSpaces.slice(0, -2)}- ${element.key}: ${stringifyValue(element.prevValue, levelOfDepth)}\n`;
          res += `${countedSpaces.slice(0, -2)}+ ${element.key}: ${stringifyValue(element.value, levelOfDepth)}\n`;
          break;
        default:
          throw new Error(`Element type ${element.type} doesn't exist`);
      }
    });
    return res;
  }
  let result = '';
  result += '{\n';
  result += innerFunc(list, 1);
  return `${result.slice(0, -1)}\n}`;
}

export default stylish;
