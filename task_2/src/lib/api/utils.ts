import { logger } from '../logger';
import type { TApiMethods } from './types';

export function responseIsHealthy(response: Response, method: TApiMethods): boolean {
    const isHealthy = response.ok;

    if (!isHealthy) {
        const message = 'Attempt query the API failed';
        logger(apiErrorMessage(response.url, method, message, response.status));
    }

    return isHealthy;
}

export function apiErrorMessage(
    url: string,
    method: TApiMethods,
    message: string,
    statusCode?: number
): string {
    const lineSep = '-'.repeat(79);

    return `
        ~${lineSep}
        ~Method: ${method};
        ~Url: ${url};
        ~Status-code: ${statusCode ? statusCode : undefined};
        ~${lineSep}
        ~Additional info: ${message};
        ~${lineSep}~
    `
        .trim()
        .replaceAll('\n', '')
        .replaceAll('~', '\n');
}
