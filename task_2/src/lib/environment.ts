import { logger } from './logger';

type TEnvVars = {
    env_exchange_rate_api_key: string;
};

export const EnvVars: TEnvVars = {
    env_exchange_rate_api_key: getEvnVar('env_exchange_rate_api_key'),
};

function getEvnVar<K extends keyof TEnvVars, T extends TEnvVars[K]>(key: K): T {
    const variable = import.meta.env[key];
    if (variable === undefined) logger(`Env variable ${key} not found.`);
    return variable;
}
