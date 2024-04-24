import { encoded, translations } from './data.js';
import { decode, getUnique } from './utils.js';

const excluded_keys = ['groupId', 'service', 'formatSize', 'ca'];
const decoded = encoded.map((obj) => decode(obj, translations, excluded_keys, 0));
console.log(decoded);

const uniqueId = getUnique(decoded, 'groupId');
console.log(uniqueId);
