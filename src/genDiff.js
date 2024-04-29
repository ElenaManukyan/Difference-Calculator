import _ from 'lodash';

function genDiff(obj1, obj2, formatName) {
  let valueForPush;
  const diff = [];
  if (_.isPlainObject(obj1) && _.isPlainObject(obj2)) {
    const keys1 = _.sortBy(Object.keys(obj1));
    const keys2 = _.sortBy(Object.keys(obj2));
    const unionKeys = _.union(keys1, keys2);
    for (let i = 0; i < unionKeys.length; i += 1) {
      const key = unionKeys[i];
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        valueForPush = {
          key,
          type: 'nested',
          value: _.sortBy(genDiff(obj1[key], obj2[key], formatName), 'key'),
        };
        diff.push(valueForPush);
      } else if (obj1[key] === obj2[key]) {
        valueForPush = {
          key,
          type: 'unchanged',
          value: obj1[key],
        };
        diff.push(valueForPush);
        _.sortBy(diff, 'key');
      } else if (
        obj1[key] !== obj2[key]
        && keys1.includes(key)
        && keys2.includes(key)
      ) {
        valueForPush = {
          key,
          type: 'changed',
          value: obj2[key],
          prevValue: obj1[key],
        };
        diff.push(valueForPush);
        _.sortBy(diff, 'key');
      } else if (!keys1.includes(key) && keys2.includes(key)) {
        valueForPush = {
          key,
          type: 'added',
          value: obj2[key],
        };
        diff.push(valueForPush);
        _.sortBy(diff, 'key');
      } else {
        valueForPush = {
          key,
          type: 'removed',
          value: obj1[key],
        };
        diff.push(valueForPush);
        _.sortBy(diff, 'key');
      }
    }
    _.sortBy(diff, 'key');
  }
  return _.sortBy(diff, 'key');
}

export default genDiff;
