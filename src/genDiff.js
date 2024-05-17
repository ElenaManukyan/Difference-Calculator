import _ from 'lodash';

function makeObj(key, typeVal, valueVal, prevValueVal = '') {
  if (prevValueVal) {
    return {
      key,
      type: typeVal,
      value: valueVal,
      prevValue: prevValueVal,
    };
  }
  return {
    key,
    type: typeVal,
    value: valueVal,
  };
}

function genDiff(obj1, obj2) {
  if (_.isPlainObject(obj1) && _.isPlainObject(obj2)) {
    const keys1 = _.sortBy(Object.keys(obj1));
    const keys2 = _.sortBy(Object.keys(obj2));
    const unionKeys = _.union(keys1, keys2);
    return _.sortBy(unionKeys.map((key) => {
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        return makeObj(key, 'nested', _.sortBy(genDiff(obj1[key], obj2[key]), 'key'));
      } if (obj1[key] === obj2[key]) {
        return makeObj(key, 'unchanged', obj1[key]);
      } if (
        obj1[key] !== obj2[key]
        && keys1.includes(key)
        && keys2.includes(key)
      ) {
        return makeObj(key, 'changed', obj2[key], obj1[key]);
      } if (!keys1.includes(key) && keys2.includes(key)) {
        return makeObj(key, 'added', obj2[key]);
      }
      return makeObj(key, 'removed', obj1[key]);
      /*
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        return {
          key,
          type: 'nested',
          value: _.sortBy(genDiff(obj1[key], obj2[key]), 'key'),
        };
      } if (obj1[key] === obj2[key]) {
        return {
          key,
          type: 'unchanged',
          value: obj1[key],
        };
      } if (
        obj1[key] !== obj2[key]
        && keys1.includes(key)
        && keys2.includes(key)
      ) {
        return {
          key,
          type: 'changed',
          value: obj2[key],
          prevValue: obj1[key],
        };
      } if (!keys1.includes(key) && keys2.includes(key)) {
        return {
          key,
          type: 'added',
          value: obj2[key],
        };
      }
      return {
        key,
        type: 'removed',
        value: obj1[key],
      };
      */
    }), 'key');
  }
  return [];
}

export default genDiff;
