import _ from 'lodash';

function stylish(list) {
  function innerFunc(listOfDifference, levelOfDepth) {
    let res = '';
    const countedSpaces = ' '.repeat(4 * levelOfDepth);
    listOfDifference.forEach((element) => {
      if (_.isArray(element.value)) {
        res += `${countedSpaces}${element.key}: {\n`;
        res += innerFunc(element.value, levelOfDepth + 1);
        res += `${countedSpaces}}\n`;
      } else {
        let value;
        if (typeof element.value === 'object') {
          value = JSON.stringify(element.value, null, countedSpaces).replace(/"/g, '').replace(/,/g, '');
        } else {
          value = element.value;
        }
        switch (element.type) {
          case 'added':
            res += `${countedSpaces.slice(0, -2)}+ ${element.key}: ${value}\n`;
            break;
          case 'unchanged':
            res += `${countedSpaces.slice(0, -2)}  ${element.key}: ${value}\n`;
            break;
          case 'removed':
            res += `${countedSpaces.slice(0, -2)}- ${element.key}: ${value}\n`;
            break;
          default:
            res += `${countedSpaces.slice(0, -2)}- ${element.key}: ${value}\n`;
            res += `${countedSpaces.slice(0, -2)}+ ${element.key}: ${value}\n`;
        }
      }
    });
    return res;
  }
  const result = `{\n${innerFunc(list, 0)}}\n`;
  return result;
}


/*
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
*/

/*
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

  // return result;
  return JSON.stringify(object, null, 4).replace(/"/g, '').replace(/,/g, '');
}
*/

export default stylish;
