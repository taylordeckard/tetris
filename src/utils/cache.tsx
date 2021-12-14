import { STORAGE_KEY } from '../constants';

export function getCache () {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) as string) ?? {};
  } catch (e) {
    return {};
  }
}

export function setCache (value: Partial<{
  camera: 'perspective' | 'orthographic';
  highScore: number;
}>) {
  const cache = getCache();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cache, ...value }));
}
