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
