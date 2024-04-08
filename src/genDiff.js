import _ from 'lodash';
import stylish from '../formatters/stylish.js';

const object1 = {
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
};
const object2 = {
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
};

let diff = [];
// const item = { key: '', type: '', value: '' };
function genDiff(obj1, obj2, formatName) {
  // const diff = [];
  const item = { key: '', type: '', value: '' };
  
  const keys1 = _.sortBy(Object.keys(obj1));
  // const keys2 = Object.keys(obj2);
  for (let keyIndex = 0; keyIndex < keys1.length; keyIndex += 1) {
    const key = keys1[keyIndex];
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (typeof value1 === 'object' && typeof value2 === 'object') {
      const nestedDiff = genDiff(value1, value2, formatName);
      // diff = [];
      item.key = key;
      item.type = 'nested';
      item.value = nestedDiff;
      //diff = [];
      // genDiff(value1, value2, formatName);
      // const nestedDiff = genDiff(value1, value2, formatName);
      // item.value = nestedDiff;
      // diff.push(item);
      // diff[key] = nestedDiff;
    } else if (typeof value1 === 'object') {
      item.key = key;
      item.type = 'nested';
      item.value = [].push(item);
    } else if (typeof value2 === 'object') {
      item.key = key;
      item.type = 'nested';
      item.value = [].push(item);
    } else if (value1 !== value2) {
      item.key = key;
      item.type = 'changed';
      item.value = value1;
      item.prevValue = value2;
      //diff.push(item);
      // diff[`- ${key}`] = value1;
      // diff[`+ ${key}`] = value2;
    } else if (value1 === value2) {
      item.key = key;
      item.type = 'unchanged';
      item.value = value1;
      // diff.push(item);
      // diff[`  ${key}`] = value1;
    } /* else {
      item.key = key;
      item.type = 'added';
      item.value = value2;
    } */
  }
  
/*  const keys2 = Object.keys(obj2);
  for (let keyIndex = 0; keyIndex < keys2.length; keyIndex += 1) {
    const key2 = keys2[keyIndex];
    // const value1 = obj1[key];
    const value2 = obj2[key2];
    if (!(key2 in obj1)) {
      if (typeof value2 === 'object') {
      item.key = key2;
      item.type = 'nested';
      item.value = [genDiff(value1, value2, formatName)];
      // diff.push(item);
      // diff[`+ ${key2}`] = value2;
    } else {
      item.key = key2;
      item.type = 'added';
      item.value = value2;
    }
  } */
  diff.push(item);
  console.log(item);
  return diff;
}
// console.log(genDiff(object1, object2, 'stylish'));
console.log(JSON.stringify(genDiff(object1, object2, 'stylish'), null, stylish(genDiff(object1, object2, 'stylish'))));

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
