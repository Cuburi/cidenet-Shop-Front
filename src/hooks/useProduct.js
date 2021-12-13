import { useCallback, useState } from 'react';
import { getStock } from '../services/detailSizeService';

const useProduct = () => {
	const [stock, setStock] = useState([]);

	const getStockSize = useCallback(async (id) => {
		const response = await getStock(id);
		if (response.status === 200) {
			setStock(response.data);
		}
	}, []);
	return {
		getStockSize,
		stock,
	};
};

export default useProduct;
