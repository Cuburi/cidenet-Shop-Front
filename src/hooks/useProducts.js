import { getColors } from '../services/colorService';
import { getBrands } from '../services/brandService';
import {
	getProducts,
	getProductsAdmin,
	getProductsByOrder,
	getProductsByOrderAdmin,
} from '../services/productsService';
import { getSections } from '../services/sectionService';
import { getSizes } from '../services/sizeService';

import { useState, useCallback } from 'react';

const useProducts = () => {
	const [products, setproducts] = useState([]);
	const [brands, setBrands] = useState([]);
	const [colors, setColors] = useState([]);
	const [sections, setSections] = useState([]);
	const [sizes, setSizes] = useState([]);
	const [searchCriteria, setSearchCriteria] = useState({});

	const loadProductsByOrder = async () => {
		const response = await getProductsByOrder();

		if (response.status === 200) {
			setproducts(response.data);
		}
	};

	const loadProductsByOrderAdmin = useCallback(async () => {
		const response = await getProductsByOrderAdmin();

		if (response.status === 200) {
			setproducts(response.data);
		}
	}, []);

	const loadProducts = async () => {
		const response = await getProducts(searchCriteria);
		if (response.status === 200) {
			setproducts(response.data);
		}
	};

	const loadProductsAdmin = useCallback(async () => {
		const response = await getProductsAdmin(searchCriteria);
		if (response.status === 200) {
			setproducts(response.data);
		}
	}, [searchCriteria]);

	const loadBrands = useCallback(async () => {
		const response = await getBrands();
		if (response.status === 200) {
			setBrands(response.data);
		}
	}, []);

	const loadColors = useCallback(async () => {
		const response = await getColors();
		if (response.status === 200) {
			setColors(response.data);
		}
	}, []);

	const loadSections = useCallback(async () => {
		const response = await getSections();
		if (response.status === 200) {
			setSections(response.data);
		}
	}, []);

	const loadSizes = useCallback(async () => {
		const response = await getSizes();
		if (response.status === 200) {
			setSizes(response.data);
		}
	}, []);

	const handleChange = (criteria, id) => {
		const idCriteria = id;

		if (idCriteria === 'brand') {
			if (criteria === '') {
				const { brand, ...updateSearchCriteria } = searchCriteria;
				setSearchCriteria(updateSearchCriteria);
			} else {
				setSearchCriteria({ ...searchCriteria, brand: criteria });
			}
		}
		if (idCriteria === 'color') {
			if (criteria === '') {
				const { color, ...updateSearchCriteria } = searchCriteria;
				setSearchCriteria(updateSearchCriteria);
			} else {
				setSearchCriteria({ ...searchCriteria, color: criteria });
			}
		}
		if (idCriteria === 'description') {
			if (criteria === '') {
				const { description, ...updateSearchCriteria } = searchCriteria;
				setSearchCriteria(updateSearchCriteria);
			} else {
				setSearchCriteria({ ...searchCriteria, description: criteria });
			}
		}
		if (idCriteria === 'section') {
			if (criteria === '') {
				const { color, ...updateSearchCriteria } = searchCriteria;
				setSearchCriteria(updateSearchCriteria);
			} else {
				setSearchCriteria({ ...searchCriteria, section: criteria });
			}
		}
	};

	const handleChangeClick = (value) => {
		handleChange(value, 'section');
	};

	return {
		loadProductsByOrder,
		loadProductsByOrderAdmin,
		loadProducts,
		loadProductsAdmin,
		loadBrands,
		loadColors,
		loadSections,
		handleChange,
		handleChangeClick,
		loadSizes,
		products: products,
		brands: brands,
		colors: colors,
		sections: sections,
		searchCriteria: searchCriteria,
		sizes: sizes,
	};
};

export default useProducts;
