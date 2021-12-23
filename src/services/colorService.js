import { instanceAxios } from './axiosHelper';

export const getColors = async () => {
	try {
		const response = await instanceAxios.get('/color/list');
		return response;
	} catch (error) {
		console.log(error);
	}
};
