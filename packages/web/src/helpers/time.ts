export async function measureTime<T>(fn: () => T): Promise<any> {
  const before = new Date().getTime();

  const fnResult = await fn();

  const after = new Date().getTime();

  const timeResult = after - before;

  return [fnResult, timeResult];

}
