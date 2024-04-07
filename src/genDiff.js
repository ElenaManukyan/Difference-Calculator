// Сделай genDiff рекурсивной функцией для проверки
// вложенных структур
function genDiff(obj1, obj2) {
  const diff = {};
  const keys1 = Object.keys(obj1);
  for (let keyIndex = 0; keyIndex < keys1.length; keyIndex += 1) {
    const key = keys1[keyIndex];
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (typeof value1 === 'object' && typeof value2 === 'object') {
      const nestedDiff = genDiff(value1, value2);
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
}

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
