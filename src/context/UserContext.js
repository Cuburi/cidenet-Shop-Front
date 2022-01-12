import { useState, createContext } from 'react';

const Context = createContext({});

export function UserContextProvider({ children }) {
	const [jwt, setJWT] = useState(() => window.sessionStorage.getItem('jwt'));
	const [emailUser, setEmailUser] = useState(() =>
		window.sessionStorage.getItem('email')
	);

	return (
		<Context.Provider value={{ jwt, setJWT, emailUser, setEmailUser }}>
			{children}
		</Context.Provider>
	);
}

export default Context;
