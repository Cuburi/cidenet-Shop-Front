import {
	createSale,
	createDetail,
	sendEmailSale,
} from '../services/saleService';

const detailSale = ({ shoppingCart, saleRef }) => {
	shoppingCart.map(async (item) => {
		const account = item.acount;
		const idProduct = item.size.idProduct;
		const saleId = saleRef.id;
		const product = item.size.product;

		await createDetail({
			amount: account,
			idProduct,
			idSale: saleId,
			product,
			sale: saleRef,
		});
	});
};

const useCheckout = () => {
	const newSale = async (address, date, totalPrice, user, shoppingCart) => {
		const { status, data } = await createSale({
			address,
			date,
			totalPrice,
			user,
		});
		if (status === 200) {
			detailSale({ shoppingCart, saleRef: data });
			callSendEmailSale(shoppingCart, user.email, data);
		}
	};

	const callSendEmailSale = (shoppingCart, mailTo, saleRef) => {
		const products = shoppingCart.map((product) => product.size.product.name);

		sendEmailSale({
			mailTo: mailTo,
			totalPrice: saleRef.totalPrice,
			products: products,
		});
	};

	return {
		newSale,
	};
};

export default useCheckout;
