import _ from 'lodash';
// import { stylish } from './src/genDiff.js';

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

const a = '+ follow';
const b = '- setting2';
const result = a.localeCompare(b); // a больше b
console.log(result); // => 1
console.log('%4820109928069'.slice(1));

/* const array = ['+ follow', '+ setting3', ' - setting2', 'setting1'];
const sortedArray = array.sort((a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
});
console.log(sortedArray); */

/* function getObjectDiff(obj1, obj2) {
  const diff = Object.keys(obj1).reduce((result, key) => {
    if (!obj2.hasOwnProperty(key)) {
      result.push([`- ${key}`, obj1[key]]);
    } else if (_.isEqual(obj1[key], obj2[key])) {
      const resultKeyIndex = result.indexOf(key);
      result.splice(resultKeyIndex, 1);
    }
    return result;
  }, Object.keys(obj2));

  return diff;
} 

console.log(getObjectDiff(object1, object2)); */

// console.log(JSON.stringify(object1, null, stylish(object1)));
// console.log(JSON.stringify(object2, null, stylish(object2)));

// assign: Дополняет объект отсутствующими (не просто undefined) свойствами из другого объекта
// console.log(JSON.stringify(_.assign(object1, object2), null, stylish(_.assign(object1, object2))));

// eslint-disable-next-line max-len
//defaults: Дополняет объект отсутствующими (=== undefined) свойствами из другого объекта — задает умолчания
//console.log(JSON.stringify(_.assign(object1, object2), null, stylish(_.defaults(object1, object2))));

// forIn: Обходит все свойства объекта (включая внутренние), вызывая для каждого из них функцию обратного вызова
/* function callback(value, key, object) {
  const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i += 1) {
        if (_.isObject(object[keys[i]])) {
            callback(value, key, (object[keys[i]]));
        }
        keys[i] = object[keys[i]];
    }
}
console.log(JSON.stringify(_.forIn(object1, callback), null, stylish(_.forIn(object1, callback)))); */

// has: Проверяет, является ли указанное свойство собственным свойством объекта
// Не глубоко идёт
// console.log(JSON.stringify(_.has(object1, 'id'), null, _.has(object1, 'id')));
