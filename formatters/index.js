import { stylish } from './stylish.js';
import plain from './plain.js';
import JsonFormatter from './JSON.js';

function chooseFormatters(difference, formatName) {
  switch (formatName) {
    case 'json':
      return JsonFormatter(stylish(difference));
    case 'plain':
      return plain(difference).slice(0, -1);
    case 'stylish':
      return stylish(difference);
    default:
      throw new Error(`Format name ${formatName} doesn't exist`);
  }
}

export default chooseFormatters;
