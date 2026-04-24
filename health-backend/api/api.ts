import AsyncStorage from '@react-native-async-storage/async-storage';

// Android emulator ke liye 10.0.2.2 use hota hai
// Real phone ke liye apna WiFi IP daalo jaise 192.168.1.5
const BASE_URL = 'http://10.0.2.2:5000/api';

async function getHeaders() {
  const token = await AsyncStorage.getItem('token');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

async function request(method: string, endpoint: string, body?: any) {
  const headers = await getHeaders();
  const options: RequestInit = { method, headers };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const authAPI = {
  signup: async (username: string, email: string, password: string) => {
    const data = await request('POST', '/auth/signup', { username, email, password });
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },
  signin: async (email: string, password: string) => {
    const data = await request('POST', '/auth/signin', { email, password });
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },
  logout: async () => {
    await AsyncStorage.multiRemove(['token', 'user']);
  },
  isLoggedIn: async () => {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  },
};

export const healthAPI = {
  saveRecord: (data: any) => request('POST', '/health/record', data),
  getWeekHistory: () => request('GET', '/health/week'),
  getMonthHistory: () => request('GET', '/health/month'),
  getGraphData: () => request('GET', '/health/graph'),
  getLatest: () => request('GET', '/health/latest'),
};