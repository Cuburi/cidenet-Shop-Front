import { useState, createContext } from 'react';

const Context = createContext({});

export function ShoppingCartContextProvider({ children }) {
	const [shoppingCart, setShoppingCart] = useState(() =>
		window.localStorage.getItem('shoppingCart')
	);

	return (
		<Context.Provider value={{ shoppingCart, setShoppingCart }}>
			{children}
		</Context.Provider>
	);
}

export default Context;
