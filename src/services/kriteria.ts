import { instance } from './axios';

export async function get() {
  const response = await instance.get('/kriteria');
  return response.data;
}

export async function post(payload: any) {
  await instance.post('/kriteria', payload);
}

export async function get_one(id: number) {
  const response = await instance.get('/kriteria/' + id);
  return response.data;
}

export async function put(id: number, payload: any) {
  await instance.put('/kriteria/' + id, payload);
}

export async function del(id: number) {
  await instance.delete('/kriteria/' + id);
}
