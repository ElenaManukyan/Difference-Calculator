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

function formatterForStylish(object) {
  let level = -2;
  const keys = Object.keys(object);
  for (let j = 0; j < keys.length; j += 1) {
    const key = keys[j];
    if (_.isPlainObject(object[key])) {
      level += 1;
      formatterForStylish(object[key]);
    }
  }
  return level;
}

function stylish(object) {
  const resJsonString = JSON.stringify(stylishObj(object), null, formatterForStylish(object));
  const newJsonString = resJsonString.replace(/"/g, '');
  const result = newJsonString.replace(/,/g, '');
  return result;
}

export { stylish, formatterForStylish, stylishObj };
