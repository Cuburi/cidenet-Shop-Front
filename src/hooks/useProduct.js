import { useCallback, useState } from 'react';

import { getStock } from '../services/detailSizeService';

import { updateAccountVisit } from '../services/productsService';

const useProduct = () => {
	const [stock, setStock] = useState([]);

	const getStockSize = useCallback(async (id) => {
		const response = await getStock(id);
		if (response.status === 200) {
			setStock(response.data);
		}
	}, []);

	const CallUpdateAccountVisit = useCallback(async (idProduct) => {
		await updateAccountVisit(idProduct);
	}, []);

	return {
		getStockSize,
		CallUpdateAccountVisit,
		stock,
	};
};

export default useProduct;
