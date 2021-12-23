import { instanceAxios } from './axiosHelper';

export const loginUser = async (user) => {
	try {
		const response = await instanceAxios.post('/auth/login', user);
		return response;
	} catch (error) {
		console.log(error);
	}
};
