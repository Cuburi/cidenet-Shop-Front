import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const getColors = async () => {
	try {
		const response = await axios({
			url: `${baseUrl}/color/list`,
			method: 'GET',
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};
