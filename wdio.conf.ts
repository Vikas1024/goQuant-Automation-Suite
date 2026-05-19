import dotenv from 'dotenv';
dotenv.config();

import { baseConfig } from '@stockx/skynet-automation-framework';

baseConfig.cucumberOpts.timeout = 480000;
if (process.env.ENV === 'lambda_test') {
    baseConfig.capabilities[0]['LT:Options'].idleTimeout = 640;
}
exports.config = baseConfig;
