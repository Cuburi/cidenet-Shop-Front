import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import useUser from '../../hooks/useUser';
import Home from '../../pages/Home';

import jwt_decode from 'jwt-decode';

const PrivateRoute = ({ children }) => {
	const { isLogged } = useUser();
	const token = window.sessionStorage.getItem('jwt') || null;
	const [isAdmin, setIsAdmin] = useState(false);
	useEffect(() => {
		if (token !== '' && token !== null) {
			var decoded = jwt_decode(token);
			const roles = decoded.roles;
			setIsAdmin(() => roles.some((element) => element === 'ROLE_ADMIN'));
		}
	}, [setIsAdmin, token]);

	if (isLogged) {
		return isAdmin ? children : <Home />;
	} else {
		return <Navigate to="/login" />;
	}
};

export default PrivateRoute;
