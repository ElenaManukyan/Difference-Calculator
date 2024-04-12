import _ from 'lodash';

let valueForPush;
function genDiff(obj1, obj2, formatName) {
  const diff = [];
  if (_.isPlainObject(obj1) && _.isPlainObject(obj2)) {
    const keys1 = _.sortBy(Object.keys(obj1));
    const keys2 = _.sortBy(Object.keys(obj2));
    const unionKeys = _.union(keys1, keys2);
    const differenceKeys1 = _.difference(keys1, keys2);
    const differenceKeys2 = _.difference(keys2, keys1);
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
        && !differenceKeys2.includes(key)
        && !differenceKeys1.includes(key)
      ) {
        valueForPush = {
          key,
          type: 'changed',
          value: obj2[key],
          prevValue: obj1[key],
        };
        diff.push(valueForPush);
        _.sortBy(diff, 'key');
      }
    }
    for (let j = 0; j < differenceKeys1.length; j += 1) {
      const key1 = differenceKeys1[j];
      valueForPush = {
        key: key1,
        type: 'removed',
        value: obj1[key1],
      };
      diff.push(valueForPush);
      _.sortBy(diff, 'key');
    }
    for (let k = 0; k < differenceKeys2.length; k += 1) {
      const key2 = differenceKeys2[k];
      valueForPush = {
        key: key2,
        type: 'added',
        value: obj2[key2],
      };
      diff.push(valueForPush);
      _.sortBy(diff, 'key');
    }
    _.sortBy(diff, 'key');
  }
  return _.sortBy(diff, 'key');
}

export default genDiff;
