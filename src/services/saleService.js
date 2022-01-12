import { instanceAxios } from './axiosHelper';

export const createSale = async (sale) => {
	try {
		const response = await instanceAxios.post('/sale/create', sale);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const createDetail = async (detailSale) => {
	try {
		const response = await instanceAxios.post('/detailSale/create', detailSale);
		return response;
	} catch (error) {
		console.log(error);
	}
};
