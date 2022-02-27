import { instanceAxios } from './axiosHelper';

export const registerUser = async (user) => {
	try {
		const response = await instanceAxios.post('/auth/new', user);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const sendEmailConfirmAccount = async (emailConfirm) => {
	try {
		console.log(emailConfirm);
		const response = await instanceAxios.post(
			'/email-password/send-email-active',
			emailConfirm
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const changePassword = async (tokenActive) => {
	try {
		const response = await instanceAxios.post(
			'/email-password/active-account',
			tokenActive
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};
