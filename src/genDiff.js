import _ from 'lodash';
import stylish from '../formatters/stylish.js';

const object1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};
const object2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

const diff = [];
// const item = { key: '', type: '', value: '' };
function genDiff(obj1, obj2, formatName) {
  let level = 0;
  let valueForPush = {};
  const keys1 = _.sortBy(Object.keys(obj1));
  const keys2 = Object.keys(obj2);
  for (let keyIndex = 0; keyIndex < keys1.length; keyIndex += 1) {
    const key = keys1[keyIndex];
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      level += 1;
      // console.log(`level = ${level}`);
      const nestedDiff = genDiff(value1, value2, formatName);

      // console.log(`nestedDiff = ${JSON.stringify(nestedDiff, null, 4)}`);
      valueForPush = {
        key,
        type: 'nested',
        value: JSON.stringify(nestedDiff.slice(-level)), // JSON.stringify(value1),
      };

      diff.push(valueForPush);
    } else if (!keys2.includes(key)) {
      level += 1;
      valueForPush = {
        key,
        type: 'removed',
        value: value1,
      };
      diff.push(valueForPush);
    } else if (value1 !== value2) {
      level += 1;
      valueForPush = {
        key,
        type: 'changed',
        value: value2,
        prevValue: value1,
      };
      diff.push(valueForPush);
      // diff.push(item);
      // diff[`- ${key}`] = value1;
      // diff[`+ ${key}`] = value2;
    } else if (value1 === value2) {
      level += 1;
      valueForPush = {
        key,
        type: 'unchanged',
        value: value1,
      };
      diff.push(valueForPush);
      // diff.push(item);
      // diff[`  ${key}`] = value1;
    }
    // diff.push(valueForPush);
  }
  //diff.push(valueForPush);

  // const keys2 = _.sortBy(Object.keys(obj2));
  for (let keyIndex = 0; keyIndex < keys2.length; keyIndex += 1) {
    const key2 = keys2[keyIndex];
    // const value1 = obj1[key];
    const value2 = obj2[key2];
    if (!(key2 in obj1)) {
      diff.push({
        key: key2,
        type: 'added',
        value: value2,
      });
    }
  }
  return diff;
}

// console.log(genDiff(object1, object2, 'stylish'));
console.log(genDiff(object1, object2, 'stylish'));
/* const support = [];
console.log(JSON.stringify(genDiff(object1, object2, 'stylish'), (key, value) => {
  if (_.isPlainObject(value)) {
    if (support.includes(value)) {
      return;
    }
    support.push(value);
  }
  return value;
})); */ // , stylish(genDiff(object1, object2, 'stylish'))));

/* function genDiff(obj1, obj2, formatName) {
  const diff = {};
  const keys1 = Object.keys(obj1);
  for (let keyIndex = 0; keyIndex < keys1.length; keyIndex += 1) {
    const key = keys1[keyIndex];
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (typeof value1 === 'object' && typeof value2 === 'object') {
      const nestedDiff = genDiff(value1, value2, formatName);
      diff[key] = nestedDiff;
    } else if (value1 !== value2) {
      diff[`- ${key}`] = value1;
      diff[`+ ${key}`] = value2;
    } else {
      diff[`  ${key}`] = value1;
    }
  }
  const keys2 = Object.keys(obj2);
  for (let keyIndex = 0; keyIndex < keys2.length; keyIndex += 1) {
    const key2 = keys2[keyIndex];
    const value2 = obj2[key2];
    if (!(key2 in obj1)) {
      diff[`+ ${key2}`] = value2;
    }
  }
  return diff;
} */

function sortObject(obj) {
  const sortedObject = {};
  if (obj !== null) {
    const sortedKeys = Object.keys(obj).sort((a, b) => {
      const aSign = a[0] === '+' || a[0] === '-' || a[0] === ' ';
      const bSign = b[0] === '+' || b[0] === '-' || b[0] === ' ';
      if (aSign && bSign) {
        return (a.slice(2)).localeCompare(b.slice(2));
      }
      if (aSign) {
        return (a.slice(2)).localeCompare(b);
      }
      if (bSign) {
        return (a).localeCompare(b.slice(2));
      }
      return 0; // Maybe do I need to delete it?
    });
    sortedKeys.forEach((key) => {
      if (typeof obj[key] === 'object') {
        sortedObject[key] = sortObject(obj[key]);
      } else {
        sortedObject[key] = obj[key];
      }
    });
  }
  return sortedObject;
}

export { genDiff, sortObject };
