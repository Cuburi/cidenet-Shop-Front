import { instanceAxios } from './axiosHelper';

export const getColors = async () => {
	try {
		const response = await instanceAxios.get('/color/list');
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const createColor = async (color) => {
	try {
		const response = await instanceAxios.post('/color/create', color);
		return response;
	} catch (error) {
		console.log(error);
	}
};
