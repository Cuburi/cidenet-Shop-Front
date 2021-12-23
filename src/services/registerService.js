import { instanceAxios } from './axiosHelper';

const baseUrl = 'http://localhost:8080';

export const registerUser = async (user) => {
	try {
		const response = await instanceAxios.post('/auth/new', user);
		return response;
	} catch (error) {
		console.log(error);
	}
};
