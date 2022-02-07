import { instanceAxios } from './axiosHelper';

export const getBrands = async () => {
	try {
		const response = await instanceAxios.get('/brand/list');
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const createBrand = async (brand) => {
	try {
		const response = await instanceAxios.post('/brand/create', brand);
		return response;
	} catch (error) {
		console.log(error);
	}
};
