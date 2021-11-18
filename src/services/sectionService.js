import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const getSections = async () => {
	try {
		const response = await axios({
			url: `${baseUrl}/section/list`,
			method: 'GET',
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};
