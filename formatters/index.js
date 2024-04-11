import { stylish, formatterForStylish } from './stylish.js';
import plain from './plain.js';

function chooseFormatters(difference, formatName) {
  if (formatName === 'stylish') {
    return JSON.stringify(stylish(difference), null, formatterForStylish(stylish(difference)));
  }
  return plain(difference).slice(0, -1);
}

export default chooseFormatters;
