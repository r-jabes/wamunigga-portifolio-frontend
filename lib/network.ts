/** Default budget for user-facing booking/API calls on slow networks. */
export const DEFAULT_FETCH_TIMEOUT_MS = 12_000;

export class NetworkTimeoutError extends Error {
  constructor(message = "Request timed out. Check your connection and try again.") {
    super(message);
    this.name = "NetworkTimeoutError";
  }
}

/**
 * Fetch with AbortController timeout — surfaces slow-network failures clearly.
 */
export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = DEFAULT_FETCH_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new NetworkTimeoutError();
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
