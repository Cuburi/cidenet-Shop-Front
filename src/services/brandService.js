import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const getBrands = async () => {
	try {
		const response = await axios({
			url: `${baseUrl}/brand/list`,
			method: 'GET',
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};
