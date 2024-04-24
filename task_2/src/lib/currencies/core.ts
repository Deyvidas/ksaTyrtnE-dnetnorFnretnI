import type { TApiMethods } from '../api/types';
import { apiErrorMessage, responseIsHealthy } from '../api/utils';
import { logger } from '../logger';
import { urlCodes, urlRate } from './constants';
import {
    type TResponseBodyConversionRate,
    type TCurrency,
    type TResponseBodyAllCodes,
    type TConversionRate,
} from './types';

/**
 * Convert the value into an API currency code format.
 */
export function codeFormat(value: string): string {
    return value.toUpperCase();
}

export async function getConversionRate(
    from: string,
    to: string
): Promise<TConversionRate> {
    [from, to] = [codeFormat(from), codeFormat(to)];
    const conversionOnError: TConversionRate = { from, to, rate: -1 };

    const method: TApiMethods = 'GET';
    const url = `${urlRate}/${from}/${to}`;
    const response = await fetch(url, { method: method });

    if (!responseIsHealthy(response, method)) return conversionOnError; // TODO WHAT TO DO IF THE API RETURNS ERROR OR INCORRECT DATA?

    const { base_code, conversion_rate, target_code }: TResponseBodyConversionRate =
        await response.json();

    if (!base_code || !conversion_rate || !target_code) {
        const msg = 'Data from response body don`t coincide with declared type.';
        logger(apiErrorMessage(response.url, method, msg, response.status));

        return conversionOnError; // TODO WHAT TO DO IF THE API RETURNS ERROR OR INCORRECT DATA?
    }

    const conversionRate: TConversionRate = {
        from: codeFormat(base_code),
        rate: conversion_rate,
        to: codeFormat(target_code),
    };

    return conversionRate;
}

export async function getAllCodes(): Promise<TCurrency[]> {
    const method: TApiMethods = 'GET';
    const response = await fetch(urlCodes, { method: method });

    if (!responseIsHealthy(response, method)) return []; // TODO WHAT TO DO IF THE API RETURNS ERROR OR INCORRECT DATA?

    const logIt = (msg: string) => {
        logger(apiErrorMessage(response.url, method, msg, response.status));
    };

    const responseBody: TResponseBodyAllCodes = await response.json();

    if (responseBody.supported_codes === undefined) {
        logIt('In response body the supported_codes key is undefined');
        return []; // TODO WHAT TO DO IF THE API RETURNS ERROR OR INCORRECT DATA?
    }

    if (responseBody.supported_codes.length === 0)
        logIt('In response body the supported_codes key is empty array');

    const allCodes: TCurrency[] = responseBody.supported_codes.map(([code, name]) => {
        return { code: codeFormat(code), name };
    });

    return allCodes;
}
