import type { PortfolioData } from '@/types/portfolio';

/**
 * Backend API base URL. Override in `.env.local`: NEXT_PUBLIC_API_URL=http://localhost:5001
 */
export function getApiBaseUrl(): string {
  if (typeof process.env.NEXT_PUBLIC_API_URL === 'string' && process.env.NEXT_PUBLIC_API_URL.trim()) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
  }
  return 'http://localhost:5001';
}

export async function fetchGithubPreview(input: string): Promise<{
  username: string;
  data: PortfolioData;
}> {
  const res = await fetch(`${getApiBaseUrl()}/api/v1/github/preview`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: input.trim() }),
  });

  const payload = (await res.json().catch(() => ({}))) as {
    error?: string;
    username?: string;
    data?: PortfolioData;
  };

  if (!res.ok) {
    const message =
      typeof payload?.error === 'string'
        ? payload.error
        : `Request failed (${res.status})`;
    throw new Error(message);
  }

  if (!payload.data || typeof payload.username !== 'string') {
    throw new Error('Invalid response from server.');
  }

  return { username: payload.username, data: payload.data };
}
