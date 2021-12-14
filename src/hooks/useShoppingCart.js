import { useContext } from 'react';
import Context from '../context/ShoppingCartContext';

const useShoppingCart = () => {
	const { shoppingCart, setShoppingCart } = useContext(Context);

	const addItemShoppingCart = (item) => {
		if (shoppingCart == null) {
			setShoppingCart([item]);
		} else {
			if (!existItemInShoppingCart(item)) {
				setShoppingCart([...shoppingCart, item]);
			} else {
				setShoppingCart(
					shoppingCart.map((itemInCart) => {
						if (
							itemInCart.size.idProduct === item.size.idProduct &&
							itemInCart.size.idSize === item.size.idSize
						) {
							itemInCart.acount += item.acount;
						}
						return itemInCart;
					})
				);
			}
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
	};
};

export default useShoppingCart;
