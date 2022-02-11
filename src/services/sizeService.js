import { instanceAxios } from './axiosHelper';

export const getSizes = async () => {
	try {
		const response = await instanceAxios.get('/size/list');
		return response;
	} catch (error) {
		console.log(error);
	}
};
