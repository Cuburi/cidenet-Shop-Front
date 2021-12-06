import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const loginUser = async (user) => {
	try {
		const response = await axios({
			url: `${baseUrl}/auth/login`,
			method: 'POST',
			data: user,
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};
