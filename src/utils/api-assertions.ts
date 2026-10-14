
import { expect } from '@playwright/test';

export function expectStatus(
  actualStatus: number,
  expectedStatus: number,
    ): void {
    expect(
    actualStatus,
    `Expected HTTP ${expectedStatus}, but received HTTP ${actualStatus}`,
  ).toBe(expectedStatus);
}

export function expectJsonContentType(
  contentType: string | undefined,
    ): void {
    expect(
    contentType,
    'Expected response Content-Type to contain application/json',
  ).toContain('application/json');
}

export function expectResponseTime(
  responseTimeMs: number,
  maxResponseTimeMs: number,
    ): void {
    expect(
    responseTimeMs,
    `Expected response time <= ${maxResponseTimeMs} ms, but received ${responseTimeMs} ms`,
  ).toBeLessThanOrEqual(maxResponseTimeMs);
}