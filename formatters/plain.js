import _ from 'lodash';

let res = '';
function plain(diff, path = '') {
  // for (let element of diff) {
  for (let i = 0; i < diff.length; i += 1) {
    const element = diff[i];
    const currentPath = `${path}${element.key}.`;
    if (_.isArray(element.value)) {
      plain(element.value, currentPath);
    } else if (element.type === 'added') {
      if (_.isPlainObject(element.value)) {
        res += `Property '${currentPath.slice(0, -1)}' was added with value: [complex value]\n`;
      } else if (_.isString(element.value)) {
        res += `Property '${currentPath.slice(0, -1)}' was added with value: '${element.value}'\n`;
      } else {
        res += `Property '${currentPath.slice(0, -1)}' was added with value: ${element.value}\n`;
      }
    } else if (element.type === 'removed') {
      res += `Property '${currentPath.slice(0, -1)}' was removed\n`;
    } else if (element.type === 'changed') {
      if (_.isPlainObject(element.value)) {
        res += `Property '${currentPath.slice(0, -1)}' was updated. From ${element.prevValue} to [complex value]\n`;
      } else if (_.isPlainObject(element.prevValue)) {
        if (_.isString(element.value)) {
          res += `Property '${currentPath.slice(0, -1)}' was updated. From [complex value] to '${element.value}'\n`;
        } else {
          res += `Property '${currentPath.slice(0, -1)}' was updated. From [complex value] to ${element.value}\n`;
        }
      } else if (_.isString(element.prevValue)) {
        if (_.isString(element.value)) {
          res += `Property '${currentPath.slice(0, -1)}' was updated. From '${element.prevValue}' to '${element.value}'\n`;
        } else {
          res += `Property '${currentPath.slice(0, -1)}' was updated. From '${element.prevValue}' to ${element.value}\n`;
        }
      } else if (_.isString(element.value)) {
        res += `Property '${currentPath.slice(0, -1)}' was updated. From ${element.prevValue} to '${element.value}'\n`;
      } else {
        res += `Property '${currentPath.slice(0, -1)}' was updated. From ${element.prevValue} to ${element.value}\n`;
      }
    }
  }
  return res;
}

export default plain;
