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

let valueForPush;
function genDiff(obj1, obj2, formatName) {
  let diff = [];
  if (_.isPlainObject(obj1) && _.isPlainObject(obj2)) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const unionKeys = _.union(keys1, keys2);
    const differenceKeys1 = _.difference(keys1, keys2);
    const differenceKeys2 = _.difference(keys2, keys1);
    for (let i = 0; i < unionKeys.length; i += 1) {
      let key = unionKeys[i];
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        valueForPush = {
          key,
          type: "nested",
          value: _.sortBy(genDiff(obj1[key], obj2[key]), "key"),
        };
        diff.push(valueForPush);
      } else if (obj1[key] === obj2[key]) {
        valueForPush = {
          key,
          type: "unchanged",
          value: obj1[key],
        };
        diff.push(valueForPush);
      } else if (
        obj1[key] !== obj2[key] &&
        !differenceKeys2.includes(key) &&
        !differenceKeys1.includes(key)
      ) {
        valueForPush = {
          key,
          type: "changed",
          value: obj2[key],
          prevValue: obj1[key],
        };
        diff.push(valueForPush);
      }
    }
    for (let j = 0; j < differenceKeys1.length; j += 1) {
      const key1 = differenceKeys1[j];
      valueForPush = {
        key: key1,
        type: "removed",
        value: obj1[key1],
      };
      diff.push(valueForPush);
    }
    for (let k = 0; k < differenceKeys2.length; k += 1) {
      const key2 = differenceKeys2[k];
      valueForPush = {
        key: key2,
        type: "added",
        value: obj2[key2],
      };
      diff.push(valueForPush);
    }
    _.sortBy(diff);
  }
  return diff;
}

console.log(genDiff(object1, object2, 'stylish'));

function sortObject(obj) {
  const sortedObject = {};
  if (obj !== null) {
    const sortedKeys = Object.keys(obj).sort((a, b) => {
      const aSign = a[0] === '+' || a[0] === '-' || a[0] === ' ';
      const bSign = b[0] === '+' || b[0] === '-' || b[0] === ' ';
      if (aSign && bSign) {
        return a.slice(2).localeCompare(b.slice(2));
      }
      if (aSign) {
        return a.slice(2).localeCompare(b);
      }
      if (bSign) {
        return a.localeCompare(b.slice(2));
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
