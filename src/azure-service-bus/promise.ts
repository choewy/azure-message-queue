export const returnPromiseType = async (
  handler: () => Promise<void>,
  timeout: number,
) => {
  return new Promise<void>(() => {
    setTimeout(async (resolve) => {
      await handler();
      resolve();
    }, timeout);
  });
};
