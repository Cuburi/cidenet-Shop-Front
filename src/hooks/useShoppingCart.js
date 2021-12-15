import { useContext } from 'react';
import Context from '../context/ShoppingCartContext';

const useShoppingCart = () => {
	const { shoppingCart, setShoppingCart } = useContext(Context);

	const addItemShoppingCart = (item) => {
		if (!existItemInShoppingCart(item)) {
			const newShoppingCart = [...shoppingCart, item];
			setShoppingCart(newShoppingCart);
			window.localStorage.setItem(
				'shoppingCart',
				JSON.stringify(newShoppingCart)
			);
		} else {
			const newShoppingCart = shoppingCart.map((itemInCart) => {
				if (
					itemInCart.size.idProduct === item.size.idProduct &&
					itemInCart.size.idSize === item.size.idSize
				) {
					itemInCart.acount += item.acount;
				}

				return itemInCart;
			});
			setShoppingCart(newShoppingCart);
			window.localStorage.setItem(
				'shoppingCart',
				JSON.stringify(newShoppingCart)
			);
		}
	};

	const existItemInShoppingCart = (item) => {
		const itemInCart = shoppingCart.find(
			(itemInCart) =>
				itemInCart.size.idProduct === item.size.idProduct &&
				itemInCart.size.idSize === item.size.idSize
		);
		return itemInCart ? true : false;
	};

	return {
		addItemShoppingCart,
		shoppingCart,
	};
};

export default useShoppingCart;
