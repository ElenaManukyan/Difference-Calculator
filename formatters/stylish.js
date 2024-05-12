import _ from 'lodash';

function stylishObj(list) {
  const result = {};
  list.forEach((element) => {
    if (_.isArray(element.value)) {
      result[element.key] = stylishObj(element.value);
    } else {
      switch (element.type) {
        case 'added':
          result[`+ ${element.key}`] = element.value;
          break;
        case 'unchanged':
          // result[`  ${element.key}`] = element.value;
          result[`${element.key}`] = element.value;
          break;
        case 'removed':
          result[`- ${element.key}`] = element.value;
          break;
        default:
          result[`- ${element.key}`] = element.prevValue;
          result[`+ ${element.key}`] = element.value;
      }
    }
  });
  return result;
}

function formatterForStylish(object, depth = 1) {
  let spaces;
  if (depth === 1) {
    spaces = 4;
  } else {
    spaces = 2;
  }
  const keys = Object.keys(object);
  const newKeys = keys.map((key) => {
    const indentedKey = key.startsWith('+') || key.startsWith('-') ? key : `  ${key}`;
    return indentedKey;
  });
  console.log(`newKeys= ${JSON.stringify(newKeys)}`);
  for (let j = 0; j < newKeys.length; j += 1) {
    const key = newKeys[j];
    if (_.isPlainObject(object[key])) {
      formatterForStylish(object[key], 4, depth + 1);
    }
  }
  console.log(`spaces= ${spaces}`);
  return JSON.stringify(object, null, spaces).replace(/"/g, '').replace(/,/g, '');
}

function stylish(object, level = 2) {
  let result = '';
  // let spaces = 0;
  const entries = Object.entries(object);
  const keys = entries.map((entry) => entry[0]);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const value = object[key];
    const countedSpaces = (key.startsWith('+') || key.startsWith('-')) ? 2 : 4;
    const spaces = ' '.repeat(countedSpaces + level);
    // console.log(`countedSpaces= ${countedSpaces}`);
    console.log(`spaces= ${spaces.length}`);
    if (_.isPlainObject(value)) {
      result += `${spaces}${key}: ${JSON.stringify(value, null, countedSpaces).replace(/"/g, '').replace(/,/g, '')}\n`;
      stylish(value, level + 1);
    }
    result += `${spaces}${key}: ${value}\n`;
  }

  return result;
}

export { stylish, stylishObj };
