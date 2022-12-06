import { configs } from './config';
import { AzureServiceBus } from './azure-service-bus';

const azureServiceBus = new AzureServiceBus(configs.azure);

process.on('SIGINT', async () => {
  await azureServiceBus.close();
});

process.on('SIGTERM', async () => {
  await azureServiceBus.close();
});
