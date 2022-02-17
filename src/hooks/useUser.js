import { useCallback, useContext, useState } from 'react';

import Context from '../context/UserContext';

import { loginUser, getUser } from '../services/loginService';
import { registerUser } from '../services/registerService';

import jwt_decode from 'jwt-decode';

const useUser = () => {
	const { jwt, setJWT, setEmailUser } = useContext(Context);
	const [isRegister, setIsRegister] = useState(false);
	const [message, setMessage] = useState('');
	const [user, setUser] = useState({});
	const [stateLogin, setStateLogin] = useState({
		loading: false,
		error: false,
	});
	const [stateRegister, setStateRegister] = useState({
		loading: false,
		error: false,
	});
	const [isAdmin, setIsAdmin] = useState(false);

	const login = useCallback(
		async ({ userName, password }) => {
			setStateLogin({ loading: true, error: false });
			const user = { email: userName, password: password };
			const response = await loginUser(user);
			if (response) {
				if (response.status === 200) {
					setStateLogin({ loading: false, error: false });
					setJWT(response.data.token);
					window.sessionStorage.setItem('jwt', response.data.token);
					var decoded = jwt_decode(response.data.token);
					window.sessionStorage.setItem('email', decoded.sub);
					setEmailUser(decoded.sub);
				}
			} else {
				setStateLogin({ loading: false, error: true });
			}
		},
		[setJWT, setEmailUser]
	);

	const register = useCallback(
		async ({ name, email, password, typeId, document, address, phone }) => {
			setStateRegister({ loading: true, error: false });
			const user = {
				name: name,
				email: email,
				password: password,
				typeId: typeId,
				document: document,
				address: address,
				phone: phone,
			};
			const response = await registerUser(user);
			if (response) {
				if (response.status === 201) {
					setStateRegister({ loading: false, error: false });
					setIsRegister(true);
				} else {
					setStateRegister({ loading: false, error: true });
				}
				setMessage(response.data.message);
			} else {
				setStateLogin({ loading: false, error: true });
			}
		},
		[]
	);

	const logout = useCallback(() => {
		setJWT(null);
		window.sessionStorage.setItem('jwt', '');
		setEmailUser(null);
		window.sessionStorage.setItem('email', '');
	}, [setJWT, setEmailUser]);

	const getUserByEmail = useCallback(async (email) => {
		console.log(email);
		const response = await getUser(email);
		console.log(response);
		setUser(response.data);
	}, []);

	return {
		login,
		logout,
		register,
		getUserByEmail,
		isLogginLoading: stateLogin.loading,
		hasLoginError: stateLogin.error,
		isLogged: Boolean(jwt),
		isRegisterLoading: stateRegister.loading,
		hasRegisterError: stateRegister.error,
		isRegister: isRegister,
		message: message,
		user: user,
		isAdmin,
		setIsAdmin,
	};
};

export default useUser;
