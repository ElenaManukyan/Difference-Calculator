import _ from 'lodash';

function stringify(value) {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
}

function added(elValue, currentPath) {
  const result = _.isPlainObject(elValue) ? `Property '${currentPath.slice(0, -1)}' was added with value: [complex value]\n` : `Property '${currentPath.slice(0, -1)}' was added with value: ${stringify(elValue)}\n`;
  return result;
}

function changed(elValue, prevValue, currentPath) {
  let result;
  if (_.isPlainObject(elValue)) {
    result = `Property '${currentPath.slice(0, -1)}' was updated. From ${prevValue} to [complex value]\n`;
  } else if (_.isPlainObject(prevValue)) {
    result = `Property '${currentPath.slice(0, -1)}' was updated. From [complex value] to ${stringify(elValue)}\n`;
  } else {
    result = `Property '${currentPath.slice(0, -1)}' was updated. From ${stringify(prevValue)} to ${stringify(elValue)}\n`;
  }
  return result;
}

function additionalFunction(difference, pathDepth = '') {
  const result = difference.map((element) => {
    const currentPath = `${pathDepth}${element.key}.`;
    switch (element.type) {
      case 'nested':
        return additionalFunction(element.value, currentPath);
      case 'added':
        return added(element.value, currentPath);
      case 'removed':
        return `Property '${currentPath.slice(0, -1)}' was removed\n`;
      case 'changed':
        return changed(element.value, element.prevValue, currentPath);
      case 'unchanged':
        return '';
      default:
        throw new Error(`Element type ${element.type} doesn't exist`);
    }
  });
  return result.join('');
}

function plain(diff, path = '') {
  const result = additionalFunction(diff, path);
  return result.slice(0, -1);
}

export default plain;
