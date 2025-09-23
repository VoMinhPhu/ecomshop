import axios from 'axios';

async function getTokenExpiration(): Promise<{
  expiresAt: Date | null;
  refreshToken: string | null;
}> {
  const res = await axios.get('/api/token');
  return res.data;
}

async function refreshToken() {
  const res = await axios.post('/api/token');
  return res.data;
}

export { getTokenExpiration, refreshToken };
