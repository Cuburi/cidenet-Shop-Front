import { instanceAxios } from './axiosHelper';

export const sendEmail = async (emailTo) => {
	try {
		const response = await instanceAxios.post(
			'/email-password/send-email',
			emailTo
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const changePassword = async (changePassword) => {
	try {
		const response = await instanceAxios.post(
			'/email-password/change-password',
			changePassword
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};
