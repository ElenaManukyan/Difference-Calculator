import _ from 'lodash';

function stringify(value) {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
}

function plain(diff, path = '', res = '') {
  let result = res;
  for (let i = 0; i < diff.length; i += 1) {
    const element = diff[i];
    const currentPath = `${path}${element.key}.`;
    if (_.isArray(element.value)) {
      result = plain(element.value, currentPath, result);
    } else if (element.type === 'added') {
      if (_.isPlainObject(element.value)) {
        result += `Property '${currentPath.slice(0, -1)}' was added with value: [complex value]\n`;
      } else {
        result += `Property '${currentPath.slice(0, -1)}' was added with value: ${stringify(element.value)}\n`;
      }
    } else if (element.type === 'removed') {
      result += `Property '${currentPath.slice(0, -1)}' was removed\n`;
    } else if (element.type === 'changed') {
      if (_.isPlainObject(element.value)) {
        result += `Property '${currentPath.slice(0, -1)}' was updated. From ${element.prevValue} to [complex value]\n`;
      } else if (_.isPlainObject(element.prevValue)) {
        result += `Property '${currentPath.slice(0, -1)}' was updated. From [complex value] to ${stringify(element.value)}\n`;
      } else {
        result += `Property '${currentPath.slice(0, -1)}' was updated. From ${stringify(element.prevValue)} to ${stringify(element.value)}\n`;
      }
    }
  }
  return result;
}

export default plain;
