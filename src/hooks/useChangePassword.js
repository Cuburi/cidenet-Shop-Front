import { useState } from 'react';
import { changePassword, sendEmail } from '../services/changePasswordService';

const useChangePassword = () => {
	const [errorSendEmail, setErrorSendEmail] = useState({
		loading: true,
		error: false,
		loadingEmail: false,
	});
	const [errorChangePassword, setErrorChangePassword] = useState({
		loading: true,
		error: false,
	});

	const sendEmailChangePassword = async (mailTo) => {
		setErrorSendEmail({ loading: true, error: false, loadingEmail: true });
		const response = await sendEmail(mailTo);

		if (response) {
			if (response.status === 200) {
				setErrorSendEmail({
					loading: false,
					error: false,
					loadingEmail: false,
				});
			}
		} else {
			setErrorSendEmail({ loading: false, error: true, loadingEmail: false });
		}
	};

	const callChangePassword = async (changePasswordDTO) => {
		setErrorChangePassword({ loading: true, error: false });
		const response = await changePassword(changePasswordDTO);

		if (response) {
			if (response.status === 200) {
				setErrorChangePassword({ loading: false, error: false });
			} else {
				setErrorChangePassword({ loading: false, error: true });
			}
		} else {
			setErrorChangePassword({ loading: false, error: true });
		}
	};

	return {
		sendEmailChangePassword,
		callChangePassword,
		errorSendEmail: errorSendEmail.error,
		loadingSendEmail: errorSendEmail.loading,
		loadingEmail: errorSendEmail.loadingEmail,
		errorChangePassword: errorChangePassword.error,
		loadingChangePassword: errorChangePassword.loading,
	};
};

export default useChangePassword;
