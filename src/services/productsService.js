import { instanceAxios } from './axiosHelper';

export const getProducts = async (criteria) => {
	try {
		const response = await instanceAxios.post('/product/list', criteria);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const getProductsAdmin = async (criteria) => {
	try {
		const response = await instanceAxios.post(
			'/product/listInactive',
			criteria
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const getProductsByOrder = async () => {
	try {
		const response = await instanceAxios.get('/product/list-order');
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const getProductsByOrderAdmin = async () => {
	try {
		const response = await instanceAxios.get('/product/list-orderAdmin');
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const updateAccountVisit = async (idProduct) => {
	try {
		const response = await instanceAxios.put(
			`/product/accountVisit/${idProduct}`
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const createProducts = async (product) => {
	try {
		const response = await instanceAxios.post('/product/create', product);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const updateProduct = async (idProduct, product) => {
	try {
		const response = await instanceAxios.put(
			`/product/update/${idProduct}`,
			product
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};
