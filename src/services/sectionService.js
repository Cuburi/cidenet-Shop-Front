import { instanceAxios } from './axiosHelper';

export const getSections = async () => {
	try {
		const response = await instanceAxios.get('/section/list');
		return response;
	} catch (error) {
		console.log(error);
	}
};
