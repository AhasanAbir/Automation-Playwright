
export async function measureResponseTime<T>(
  action: () => Promise<T>): Promise<{ result: T; responseTimeMs: number }> {
  const startTime = Date.now();
  const result = await action();
  const responseTimeMs = Date.now() - startTime;

  return {
    result,
    responseTimeMs,
  };
}
