import { useState } from 'react';
import { sendEmail } from '../services/changePasswordService';

const useChangePassword = () => {
	const [errorChangePassword, setErrorChangePassword] = useState(false);

	const sendEmailChangePassword = async (mailTo) => {
		setErrorChangePassword(false);
		const response = await sendEmail(mailTo);
		console.log(response);

		if (!response) {
			console.log('Siu');
			setErrorChangePassword(true);
		}
	};

	return {
		errorChangePassword,
		sendEmailChangePassword,
	};
};

export default useChangePassword;
