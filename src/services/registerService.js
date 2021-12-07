import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const registerUser = async (user) => {
	try {
		const response = await axios({
			url: `${baseUrl}/auth/new`,
			method: 'POST',
			data: user,
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};
