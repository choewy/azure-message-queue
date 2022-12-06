import 'dotenv/config';

import { azureServiceBusConfig } from './azure.config';

export * from './types';

export const configs = {
  azure: azureServiceBusConfig,
};
