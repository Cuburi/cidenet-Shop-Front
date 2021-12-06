import { useCallback, useContext, useState } from 'react';
import Context from '../context/UserContext';
import { loginUser } from '../services/loginService';

const useUser = () => {
	const { jwt, setJWT } = useContext(Context);
	const [stateLogin, setStateLogin] = useState({
		loading: false,
		error: false,
	});

	const login = useCallback(
		async ({ userName, password }) => {
			setStateLogin({ loading: true, error: false });
			const user = { email: userName, password: password };
			const response = await loginUser(user);
			if (response) {
				if (response.status === 200) {
					setStateLogin({ loading: false, error: false });
					setJWT(response.data.token);
				}
				if (response.status === 400) {
					console.log(response);
				}
			} else {
				setStateLogin({ loading: false, error: true });
				console.log('a');
			}
		},
		[setJWT]
	);

	const logout = useCallback(() => {
		setJWT(null);
	}, [setJWT]);

	return {
		isLogged: Boolean(jwt),
		login,
		logout,
		isLogginLoading: stateLogin.loading,
		hasLoginError: stateLogin.error,
	};
};

export default useUser;
