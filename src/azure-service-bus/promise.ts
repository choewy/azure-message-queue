export const returnPromiseType = async (
  handler: () => Promise<void>,
  timeout: number,
) => {
  return new Promise<void>((resolve) => {
    setTimeout(async () => {
      await handler();
      resolve();
    }, timeout);
  });
};
