/**
 * The body type that is part of the response given after making a request to
 * https://v6.exchangerate-api.com/v6/{YOUR-API-KEY}/codes.
 * ---
 * @param `supported_codes`
 * - This key is present only if `result='success'`and contains an array of pairs, where:
 * - 0: currency code;
 * - 1: currency name.
 */
export type TResponseBodyAllCodes = {
    supported_codes?: Array<[string, string]>;
};

export type TCurrency = {
    code: string;
    name: string;
};

/**
 * The body type that is part of the response given after making a request to
 * https://v6.exchangerate-api.com/v6/{YOUR-API-KEY}/pair/{FROM}/{TO}.
 * ---
 * @param `base_code` The code of "from" currency, e.g. EUR | USD | RUB
 * @param `target_code` The code of "to" currency, e.g. EUR | USD | RUB
 * @param `conversion_rate` The ratio of conversion between "from" and "to".
 */
export type TResponseBodyConversionRate = {
    base_code: string;
    target_code: string;
    conversion_rate: number;
};

export type TConversionRate = {
    from: string;
    to: string;
    rate: number;
};
