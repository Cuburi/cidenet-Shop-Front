import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import useUser from '../../hooks/useUser';
import Home from '../../pages/Home';

const PrivateRoute = ({ children }) => {
	const { isLogged } = useUser();
	const token = window.sessionStorage.getItem('jwt') || null;
	const [isAdmin, setIsAdmin] = useState(false);
	useEffect(() => {
		if (token !== '' && token !== null) {
			const tokenPayload = token.split('.')[1];
			const payloadDecoded = atob(tokenPayload);
			const valuesPayload = JSON.parse(payloadDecoded);
			const roles = valuesPayload.roles;
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
