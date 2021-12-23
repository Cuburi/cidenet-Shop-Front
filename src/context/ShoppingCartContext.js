import { useState, createContext } from 'react';

const Context = createContext({});

export function ShoppingCartContextProvider({ children }) {
	const InitialShoppingCart =
		JSON.parse(window.localStorage.getItem('shoppingCart')) || [];
	const [shoppingCart, setShoppingCart] = useState(InitialShoppingCart);

	return (
		<Context.Provider value={{ shoppingCart, setShoppingCart }}>
			{children}
		</Context.Provider>
	);
}

export default Context;
