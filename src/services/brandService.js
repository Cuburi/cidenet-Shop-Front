import { instanceAxios } from './axiosHelper';

export const getBrands = async () => {
	try {
		const response = await instanceAxios.get('/brand/list');
		return response;
	} catch (error) {
		console.log(error);
	}
};
