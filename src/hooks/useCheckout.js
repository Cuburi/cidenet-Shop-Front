import { useState } from 'react';

import { createSale, createDetail } from '../services/saleService';

const detailSale = ({ shoppingCart, saleRef }) => {
	shoppingCart.map(async (item) => {
		const account = item.acount;
		const idProduct = item.size.idProduct;
		const saleId = saleRef.id;
		const product = item.size.product;

		const response = await createDetail({
			amount: account,
			idProduct,
			idSale: saleId,
			product,
			sale: saleRef,
		});
		if (response.status === 200) {
			console.log('Oka');
		}
	});
};

const useCheckout = () => {
	const [sale, setSale] = useState({});

	const newSale = async (address, date, totalPrice, user, shoppingCart) => {
		const response = await createSale({ address, date, totalPrice, user });
		if (response.status === 200) {
			setSale(response.data);
			detailSale({ shoppingCart, saleRef: response.data });
		}
	};

	return {
		newSale,
		sale,
	};
};

export default useCheckout;
