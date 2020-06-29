import { instance } from './axios';

export async function apiListBalita() {
	const response = await instance.get('/alternatif');
	return response.data;
}

export async function apiCreateBalita(payload: any) {
	await instance.post('/alternatif', payload);
}

export async function apiGetOneBalita(id: number) {
	const response = await instance.get('/alternatif/' + id);
	return response.data;
}

export async function apiUpdateBalita(id: number, payload: any) {
	await instance.put('/alternatif/' + id, payload);
}

export async function apiDeleteBalita(id: number) {
	await instance.delete('/alternatif/' + id);	
}