import {
  ProcessErrorArgs,
  ServiceBusClient,
  ServiceBusMessage,
  ServiceBusReceiver,
  ServiceBusSender,
} from '@azure/service-bus';
import { AzureServiceBusConfig } from 'src/config';
import { ServiceBusSubject, ServiceSubscribeSubject } from './enums';
import { ReceivedMessageBody } from './types';

export class AzureServiceBus {
  private readonly client: ServiceBusClient;
  private readonly sender: ServiceBusSender;
  private readonly receiver: ServiceBusReceiver;

  constructor(private readonly config: AzureServiceBusConfig) {
    this.client = new ServiceBusClient(this.config.connection);
    this.sender = this.client.createSender(this.config.serviceQueue);
    this.receiver = this.client.createReceiver(this.config.clipQueue);

    this.receiver.subscribe(
      {
        processMessage: this.messageHandler.bind(this),
        processError: this.errorHandler.bind(this),
      },
      { maxConcurrentCalls: 20 },
    );
  }

  private async messageHandler(message: ServiceBusMessage): Promise<void> {
    const subject = message.subject as ServiceSubscribeSubject;
    const body = message.body as ReceivedMessageBody;

    switch (subject) {
      case ServiceSubscribeSubject.Create:
        /** @progressing mp4 파일을 유튜브에 업로드 */
        await this.sendToService(ServiceBusSubject.InProgress, {
          clipId: body.clipId,
        });

        /** @complete 업로드 완료 후 서버 A에게 유튜브 영상 링크 전달 */
        await this.sendToService(ServiceBusSubject.Completed, {
          clipId: body.clipId,
          youtubeUrl: 'https://youtu.be/WvKVWEbLru0',
        });

        break;
    }
  }

  private async errorHandler(args: ProcessErrorArgs): Promise<void> {
    console.error(args);
  }

  async sendToService<T = any>(
    subject: ServiceBusSubject,
    body: T,
  ): Promise<void> {
    console.log(subject);
    return this.sender.sendMessages({
      contentType: 'application/json',
      subject,
      body,
    });
  }

  async close(): Promise<void> {
    await Promise.all([
      this.sender.close(),
      this.receiver.close(),
      this.client.close(),
    ]);
  }
}
