import { EnvVars } from '../environment';

const { env_exchange_rate_api_key: api_key } = EnvVars;

const rootUrl = `https://v6.exchangerate-api.com/v6/${api_key}`;

export const urlCodes = `${rootUrl}/codes`;
export const urlRate = `${rootUrl}/pair`;
