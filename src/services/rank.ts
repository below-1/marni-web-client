import { instance } from './axios';

export async function apiRank() {
	const response = await instance.get('/rank');
	return response.data;
}