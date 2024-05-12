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
          result[`  ${element.key}`] = element.value;
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

function stylish(object) {
  function mapped(obj) {
    const result = {};
    const entries = Object.entries(obj);
    const keys = entries.map((entry) => entry[0]);
    const newKeys = keys.map((key) => {
      const indentedKey = (key.startsWith('+') || key.startsWith('-')) ? key : `  ${key}`;
      return indentedKey;
    });
    for (let i = 0; i < newKeys.length; i += 1) {
      const key = keys[i];
      const newKey = newKeys[i];
      if (_.isPlainObject(obj[key])) {
        result[`${newKey}`] = mapped(obj[key]);
      }
      result[`${newKey}`] = obj[key];
    }
    return result;
  }
  console.log(`mapped(object)= ${JSON.stringify(mapped(object))}`);
  const result = JSON.stringify(object, null, 4).replace(/"/g, '').replace(/,/g, '');
  return result;
}

export { stylish, stylishObj };
