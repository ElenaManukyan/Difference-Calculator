/* eslint-disable comma-dangle */
/* eslint-disable indent */
const answerNestedJSON = {
    common: {
      '+ follow': false,
      '  setting1': 'Value 1',
      '- setting2': 200,
      '- setting3': true,
      '+ setting3': null,
      '+ setting4': 'blah blah',
      '+ setting5': {
            key5: 'value5'
        },
        setting6: {
            doge: {
              '- wow': '',
              '+ wow': 'so much'
            },
          '  key': 'value',
          '+ ops': 'vops'
        }
    },
    group1: {
      '- baz': 'bas',
      '+ baz': 'bars',
      '  foo': 'bar',
      '- nest': {
            key: 'value'
        },
      '+ nest': 'str'
    },
  '- group2': {
        abc: 12345,
        deep: {
            id: 45
        }
    },
  '+ group3': {
        deep: {
            id: {
                number: 45
            }
        },
        fee: 100500
    }
  };

let formattedText = '';
function plain(object, path = '') {
  const keys = Object.keys(object);
  for (let indexKey = 0; indexKey < keys.length; indexKey += 1) {
    const key = keys[indexKey];
    let trimKey;
    let currentPath;
    const firstChar = key[0] === '+' || key[0] === '-';
    if (firstChar) {
        trimKey = key.slice(2);
        currentPath = (path === '') ? trimKey : `${path}.${trimKey}`;
    } else {
        currentPath = (path === '') ? key : `${path}.${key}`;
    }
    if (typeof object[key] === 'object' && object[key] !== null) {
      /* if (key[0] === '+') {
        formattedText += `Property '${currentPath}' was added with value: [complex value]\n`;
      } else if (((indexKey + 1) < keys.length)) {
        if ((keys[indexKey].slice(2) === keys[indexKey + 1].slice(2))) {
          formattedText += `Property '${currentPath}' was updated. From [complex value] to ${object[keys[indexKey + 1]]}\n`;
        }
      } else if (key[0] === '-') {
        formattedText += `Property '${currentPath}' was removed\n`;
      } */
      plain(object[key], currentPath);
    } else if (((indexKey + 1) < keys.length)) {
        // console.log(`keys[indexKey].slice(2) = ${keys[indexKey].slice(2)}`);
        // console.log(`keys[indexKey + 1].slice(2) = ${keys[indexKey + 1].slice(2)}`);
        if ((keys[indexKey].slice(2) === keys[indexKey + 1].slice(2))) {
            formattedText += `Property '${currentPath}' was updated. From ${object[keys[indexKey]]} to ${object[keys[indexKey + 1]]}\n`;
        } else if ((key[0] === '+') && ((keys[indexKey].slice(2) !== keys[indexKey + 1].slice(2)))) {
          formattedText += `Property '${currentPath}' was added with value: ${object[key]}\n`;
        } else if ((key[0] === '-') && ((keys[indexKey].slice(2) !== keys[indexKey + 1].slice(2)))) {
          formattedText += `Property '${currentPath}' was removed\n`;
        }
   }
}
  return formattedText;
}

console.log(plain(answerNestedJSON));

export default plain;
