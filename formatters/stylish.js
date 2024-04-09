import _ from 'lodash';

const stylish = (obj, depth = 1) => {
  let i;
  let level = depth;
  if (_.isPlainObject(obj)) {
    const keys = Object.keys(obj);
    for (let j = 0; j < keys.length; j += 1) {
      const key = keys[j];
      i = obj[key];
      if ((typeof i) === 'object') {
        level += 1;
        stylish(i);
      }
    }
  }
  return level;
};

export default stylish;
// && (i !== null)
