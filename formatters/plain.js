import _ from 'lodash';

function stringify(value) {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
}

function plain(diff, path = '') {
  const result = diff.map((element) => {
    const currentPath = `${path}${element.key}.`;
    switch (element.type) {
      case 'nested':
        return plain(element.value, currentPath);
      case 'added':
        if (_.isPlainObject(element.value)) {
          return `Property '${currentPath.slice(0, -1)}' was added with value: [complex value]\n`;
        }
        return `Property '${currentPath.slice(0, -1)}' was added with value: ${stringify(element.value)}\n`;

      case 'removed':
        return `Property '${currentPath.slice(0, -1)}' was removed\n`;
      case 'changed':
        if (_.isPlainObject(element.value)) {
          return `Property '${currentPath.slice(0, -1)}' was updated. From ${element.prevValue} to [complex value]\n`;
        }
        if (_.isPlainObject(element.prevValue)) {
          return `Property '${currentPath.slice(0, -1)}' was updated. From [complex value] to ${stringify(element.value)}\n`;
        }
        return `Property '${currentPath.slice(0, -1)}' was updated. From ${stringify(element.prevValue)} to ${stringify(element.value)}\n`;
      case 'unchanged':
        // return `Property '${currentPath.slice(0, -1)}' was unchanged.`;
        return '';
      default:
        throw new Error(`Element type ${element.type} doesn't exist`);
    }
  });
  return result.join('');
}
/*
  let result = res;
  diff.forEach((element) => {
    const currentPath = `${path}${element.key}.`;
    if (element.type === 'nested') {
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
  });
  */
// return result;
// }

export default plain;
