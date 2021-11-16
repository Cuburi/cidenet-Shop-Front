import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const getProducts = async (criteria) => {
	try {
		const response = await axios({
			url: `${baseUrl}/product/list`,
			method: 'POST',
			data: criteria,
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};
