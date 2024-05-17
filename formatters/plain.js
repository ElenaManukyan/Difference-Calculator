import _ from 'lodash';

function stringify(value) {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
}

function plain(diff, path = '') {
  function innerFunction(difference, pathDepth = '') {
    const result = difference.map((element) => {
      const currentPath = `${pathDepth}${element.key}.`;
      let res;
      switch (element.type) {
        case 'nested':
          return innerFunction(element.value, currentPath);
        case 'added':
          res = _.isPlainObject(element.value) ? `Property '${currentPath.slice(0, -1)}' was added with value: [complex value]\n` : `Property '${currentPath.slice(0, -1)}' was added with value: ${stringify(element.value)}\n`;
          return res;
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
          return '';
        default:
          throw new Error(`Element type ${element.type} doesn't exist`);
      }
    });
    return result.join('');
  }
  const result = innerFunction(diff, path);
  return result.slice(0, -1);
}

export default plain;
