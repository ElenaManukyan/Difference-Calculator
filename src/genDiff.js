import _ from 'lodash';

const genDiff = (file1, file2) => {
  const content1 = _.sortBy(Object.entries(file1));
  const content2 = _.sortBy(Object.entries(file2));
  const keys1 = _.sortBy(Object.keys(file1));
  const keys2 = _.sortBy(Object.keys(file2));
  const values2 = Object.values(file2);
  const result = {};
  for (let i = 0; i < content1.length; i += 1) {
    const [key1, val1] = content1[i];
    if (keys2.includes(key1)) {
      const indexOfKey2 = keys2.indexOf(key1);
      if (values2.includes(val1)) {
        result[key1] = val1;
      } else {
        result[`- ${key1}`] = val1;
        const [key2, value2] = content2[indexOfKey2];
        result[`+ ${key2}`] = value2;
      }
    } else {
      result[`- ${key1}`] = val1;
    }
  }
  for (let j = 0; j < content2.length; j += 1) {
    const [key2, val2] = content2[j];
    if (!keys1.includes(key2)) {
      result[`+ ${key2}`] = val2;
    }
  }
  return JSON.stringify(result);
};

export default genDiff;
