import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8080',
});

instance.interceptors.request.use(
	(config) => {
		const JWT = sessionStorage.getItem('jwt') || '';

		config.headers = { Authorization: `Bearer ${JWT}` };
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const instanceAxios = instance;
