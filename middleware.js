import { geolocation, rewrite } from '@vercel/edge';

export default function middleware(request) {
  const url = new URL(request.url);
  url.pathname = '/api/cake';

  return rewrite(url);
}