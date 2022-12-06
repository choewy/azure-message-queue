export type ReceivedMessageBody = {
  clipId: number;
  mp4File: string;
};

export type SendInProgressMessageBody = ReceivedMessageBody;

export type SendCompletedMessageBody = ReceivedMessageBody & {
  url: string;
};
