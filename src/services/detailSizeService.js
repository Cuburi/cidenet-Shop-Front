import { instanceAxios } from './axiosHelper';

export const getStock = async (id) => {
	try {
		const response = await instanceAxios.get(`/sizeStock/stock/${id}`);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const updateStock = async (idProduct, idSize, value) => {
	try {
		const response = await instanceAxios.put(
			`/sizeStock/newStock/${idSize}/${idProduct}/${value}`
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const getStockById = async (idProduct, idSize) => {
	try {
		const response = await instanceAxios.get(
			`/sizeStock/${idSize}/${idProduct}`
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const createStock = async (detailSize) => {
	try {
		const response = await instanceAxios.post('/sizeStock/create', detailSize);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const deleteProducts = async (idProduct) => {
	try {
		const response = await instanceAxios.delete(
			`/sizeStock/delete/${idProduct}`
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const deleteStock = async (idSize, idProduct) => {
	try {
		const response = await instanceAxios.delete(
			`/sizeStock/deleteStock/${idSize}/${idProduct}`
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};
