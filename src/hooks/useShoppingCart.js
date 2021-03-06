import { useCallback, useContext, useState } from 'react';

import Context from '../context/ShoppingCartContext';
import ContextUser from '../context/UserContext';

import { updateStock, getStockById } from '../services/detailSizeService';

const useShoppingCart = () => {
	const { shoppingCart, setShoppingCart } = useContext(Context);
	const { jwt } = useContext(ContextUser);
	const [totalPrice, setTotalPrice] = useState(0);

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
					itemInCart.size.idSize === item.size.idSize &&
					itemInCart.acount + item.acount <= item.size.stock
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
		totalPriceShoppingCart();
	};

	const existItemInShoppingCart = (item) => {
		const itemInCart = shoppingCart.find(
			(itemInCart) =>
				itemInCart.size.idProduct === item.size.idProduct &&
				itemInCart.size.idSize === item.size.idSize
		);
		return itemInCart ? true : false;
	};

	const checkStock = async () => {
		let haveStock = true;
		const newShoppingCart = await Promise.all(
			shoppingCart.map(async (itemInCart) => {
				const { data } = await getStockById(
					itemInCart.size.idProduct,
					itemInCart.size.idSize
				);

				if (itemInCart.acount > data.stock) {
					haveStock = false;
					itemInCart.acount = data.stock;
				}
				return itemInCart;
			})
		);
		setShoppingCart(newShoppingCart);
		window.localStorage.setItem(
			'shoppingCart',
			JSON.stringify(newShoppingCart)
		);
		deleteItemShoppingCart();
		totalPriceShoppingCart();
		return haveStock;
	};

	const removeItemShoppingCart = (item) => {
		const newShoppingCart = shoppingCart.map((itemInCart) => {
			if (
				itemInCart.size.idProduct === item.size.idProduct &&
				itemInCart.size.idSize === item.size.idSize
			) {
				itemInCart.acount--;
			}

			return itemInCart;
		});
		setShoppingCart(newShoppingCart);
		window.localStorage.setItem(
			'shoppingCart',
			JSON.stringify(newShoppingCart)
		);
		deleteItemShoppingCart();
		totalPriceShoppingCart();
	};

	const deleteItemShoppingCart = () => {
		const itemInCart = shoppingCart.find((item) => item.acount === 0);
		const newShoppingCart = shoppingCart.filter((item) => item !== itemInCart);
		window.localStorage.setItem(
			'shoppingCart',
			JSON.stringify(newShoppingCart)
		);
		setShoppingCart(newShoppingCart);
	};

	const totalPriceShoppingCart = () => {
		let totalHelper = 0;
		shoppingCart.forEach((item) => {
			totalHelper += item.acount * item.size.product.salePrice;
		});
		setTotalPrice(totalHelper);
	};

	const removeShoppingCart = () => {
		setShoppingCart([]);
		window.localStorage.setItem('shoppingCart', '[]');
	};

	const newStock = () => {
		shoppingCart.map((item) =>
			updateStockFetch(item.size.idProduct, item.size.idSize, item.acount)
		);
	};

	const updateStockFetch = useCallback(
		async (idProduct, idSize, value) => {
			await updateStock(idProduct, idSize, value, jwt);
		},
		[jwt]
	);

	return {
		addItemShoppingCart,
		removeItemShoppingCart,
		totalPriceShoppingCart,
		removeShoppingCart,
		newStock,
		checkStock,
		totalPrice: totalPrice,
		shoppingCart: shoppingCart,
	};
};

export default useShoppingCart;
