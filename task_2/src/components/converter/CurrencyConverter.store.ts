import { readable } from 'svelte/store';
import { getAllCodes } from '../../lib/currencies/core';

export const currencies = readable(getAllCodes());
