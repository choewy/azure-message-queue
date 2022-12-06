import { AzureServiceBusConfig } from './types';

export const azureServiceBusConfig: AzureServiceBusConfig = {
  connection: process.env.AZURE_SERVICE_BUS_CONNECTION,
  clipQueue: process.env.AZURE_SERVICE_BUS_CLIP_QUEUE,
  serviceQueue: process.env.AZURE_SERVICE_BUS_SERVICE_QUEUE,
};
