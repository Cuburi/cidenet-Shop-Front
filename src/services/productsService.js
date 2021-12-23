import { instanceAxios } from './axiosHelper';

export const getProducts = async (criteria) => {
	try {
		const response = await instanceAxios.post('/product/list', criteria);
		return response;
	} catch (error) {
		console.log(error);
	}
};
