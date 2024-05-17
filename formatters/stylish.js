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
    const countedSpaces = ' '.repeat(4 * levelOfDepth);
    const result = listOfDifference.map((element) => {
      switch (element.type) {
        case 'nested':
          return `${countedSpaces}${element.key}: {\n${innerFunc(stringifyValue(element.value, levelOfDepth), levelOfDepth + 1)}\n${countedSpaces}}`;
        case 'added':
          return `${countedSpaces.slice(0, -2)}+ ${element.key}: ${stringifyValue(element.value, levelOfDepth)}`;
        case 'unchanged':
          return `${countedSpaces.slice(0, -2)}  ${element.key}: ${stringifyValue(element.value, levelOfDepth)}`;
        case 'removed':
          return `${countedSpaces.slice(0, -2)}- ${element.key}: ${stringifyValue(element.value, levelOfDepth)}`;
        case 'changed':
          return `${countedSpaces.slice(0, -2)}- ${element.key}: ${stringifyValue(element.prevValue, levelOfDepth)}\n${countedSpaces.slice(0, -2)}+ ${element.key}: ${stringifyValue(element.value, levelOfDepth)}`;
        default:
          throw new Error(`Element type ${element.type} doesn't exist`);
      }
    });
    return result.join('\n');
  }
  const result = `{\n${innerFunc(list, 1)}`;
  return `${result}\n}`;
}

export default stylish;
