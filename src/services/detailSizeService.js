import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const getStock = async (id) => {
	try {
		const response = await axios({
			url: `${baseUrl}/sizeStock/stock/${id}`,
			method: 'GET',
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const updateStock = async (idProduct, idSize, value, jwt) => {
	try {
		const response = await axios({
			url: `${baseUrl}/sizeStock/newStock/${idSize}/${idProduct}/${value}`,
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const searchDetailStock = async (idProduct, idSize) => {
	try {
		const response = await axios({
			url: `${baseUrl}/sizeStock/${idSize}/${idProduct}`,
			method: 'GET',
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};
