import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const updateStock = async (idProduct, idSize, value) => {
	try {
		const response = await axios({
			url: `${baseUrl}/sizeStock/update/${idProduct}/${idSize}/${value}`,
			method: 'PUT',
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};
