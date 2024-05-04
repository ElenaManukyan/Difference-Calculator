import _ from 'lodash';

function stylish(list) {
  const result = {};
  for (let i = 0; i < list.length; i += 1) {
    const element = list[i];
    if (_.isArray(element.value)) {
      result[element.key] = stylish(element.value);
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
  }
  return result;
}

function formatterForStylish(object) {
  let level = 1;
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

export { stylish, formatterForStylish };
