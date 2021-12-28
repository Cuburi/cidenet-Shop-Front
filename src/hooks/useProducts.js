import { getColors } from '../services/colorService';
import { getBrands } from '../services/brandService';
import { getProducts } from '../services/productsService';
import { getSections } from '../services/sectionService';

import { useState } from 'react';

const useProducts = () => {
	const [products, setproducts] = useState([]);
	const [brands, setBrands] = useState([]);
	const [colors, setColors] = useState([]);
	const [sections, setSections] = useState([]);
	const [searchCriteria, setSearchCriteria] = useState({});

	const loadProducts = async () => {
		const response = await getProducts(searchCriteria);
		if (response.status === 200) {
			setproducts(response.data);
		}
	};

	const loadBrands = async () => {
		const response = await getBrands();
		if (response.status === 200) {
			setBrands(response.data);
		}
	};

	const loadColors = async () => {
		const response = await getColors();
		if (response.status === 200) {
			setColors(response.data);
		}
	};

	const loadSections = async () => {
		const response = await getSections();
		if (response.status === 200) {
			setSections(response.data);
		}
	};

	const handleChange = (criteria, id) => {
		const idCriteria = id;

		if (idCriteria === 'brand') {
			setSearchCriteria({ ...searchCriteria, brand: criteria });
		}
		if (idCriteria === 'color') {
			setSearchCriteria({ ...searchCriteria, color: criteria });
		}
		if (idCriteria === 'description') {
			setSearchCriteria({ ...searchCriteria, description: criteria });
		}
		if (idCriteria === 'section') {
			setSearchCriteria({ ...searchCriteria, section: criteria });
		}
	};

	const handleChangeClick = (value) => {
		handleChange(value, 'section');
	};

	return {
		loadProducts,
		loadBrands,
		loadColors,
		loadSections,
		handleChange,
		handleChangeClick,
		products: products,
		brands: brands,
		colors: colors,
		sections: sections,
		searchCriteria: searchCriteria,
	};
};

export default useProducts;
