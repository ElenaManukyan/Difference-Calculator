import _ from 'lodash';

function stringify(value) {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
}

function addingStrings(difference, pathDepth = '') {
  const result = difference.map((element) => {
    const fullPath = pathDepth ? `${pathDepth}.${element.key}` : element.key;
    switch (element.type) {
      case 'nested':
        return addingStrings(element.value, fullPath);
      case 'added':
        return _.isPlainObject(element.value) ? `Property '${fullPath}' was added with value: [complex value]\n` : `Property '${fullPath}' was added with value: ${stringify(element.value)}\n`;
      case 'removed':
        return `Property '${fullPath}' was removed\n`;
      case 'changed':
        if (_.isPlainObject(element.value)) {
          return `Property '${fullPath}' was updated. From ${element.prevValue} to [complex value]\n`;
        }
        if (_.isPlainObject(element.prevValue)) {
          return `Property '${fullPath}' was updated. From [complex value] to ${stringify(element.value)}\n`;
        }
        return `Property '${fullPath}' was updated. From ${stringify(element.prevValue)} to ${stringify(element.value)}\n`;
      case 'unchanged':
        return '';
      default:
        throw new Error(`Element type ${element.type} doesn't exist`);
    }
  });
  return result.join('');
}

function plain(diff, path = '') {
  const result = addingStrings(diff, path);
  return result.trim();
}

export default plain;
