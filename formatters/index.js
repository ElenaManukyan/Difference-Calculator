import { stylish, formatterForStylish } from './stylish.js';
import plain from './plain.js';
import JsonFormatter from './JSON.js';

function chooseFormatters(difference, formatName) {
  switch (formatName) {
    case 'stylish':
      return JSON.stringify(stylish(difference), null, formatterForStylish(stylish(difference)));

    case 'plain':
      return plain(difference).slice(0, -1);

    default:
      return JsonFormatter(stylish(difference));
  }
}

export default chooseFormatters;
