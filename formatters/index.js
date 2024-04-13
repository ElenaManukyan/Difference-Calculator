import { stylish, formatterForStylish } from './stylish.js';
import plain from './plain.js';
import JsonFormatter from './JSON.js';

function chooseFormatters(difference, formatName) {
  if (formatName === 'stylish') {
    return JSON.stringify(stylish(difference), null, formatterForStylish(stylish(difference)));
  }
  if (formatName === 'plain') {
    return plain(difference).slice(0, -1);
  }
  const diff = stylish(difference);
  return JsonFormatter(diff);
}

export default chooseFormatters;
