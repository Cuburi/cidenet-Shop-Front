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

export const updateStock = async (idProduct, idSize, value) => {
	try {
		const response = await axios({
			url: `${baseUrl}/sizeStock/update/${idSize}/${idProduct}/${value}`,
			method: 'PUT',
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const searchDetailStock = async (idProduct, idSize) => {
	try {
		const response = await axios({
			url: `${baseUrl}/sizeStock/search/${idSize}/${idProduct}`,
			method: 'GET',
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};
