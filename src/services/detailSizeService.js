import { instanceAxios } from './axiosHelper';

export const getStock = async (id) => {
	try {
		const response = await instanceAxios.get(`/sizeStock/stock/${id}`);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const updateStock = async (idProduct, idSize, value, jwt) => {
	try {
		const response = await instanceAxios.put(
			`/sizeStock/newStock/${idSize}/${idProduct}/${value}`
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const updateAccountVisit = async (idProduct) => {
	console.log(idProduct);
	try {
		const response = await instanceAxios.put(`/accountVisit/${idProduct}`);
		return response;
	} catch (error) {
		console.log(error);
	}
};
