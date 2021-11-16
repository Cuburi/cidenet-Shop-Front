import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Product from './Product';
import SelectFilter from './SelectFilter';
import { getBrands } from './services/brandService';
import { getColors } from './services/colorService';
import { getProducts } from './services/productsService';

const Products = () => {
	const [products, setproducts] = useState([]);
	const [brands, setBrands] = useState([]);
	const [colors, setColors] = useState([]);
	const [criteria, setCriteria] = useState({});

	useEffect(() => {
		const loadProducts = async () => {
			const response = await getProducts(criteria);
			if (response.status === 200) {
				setproducts(response.data);
			}
		};
		loadProducts();
	}, [criteria]);

	useEffect(() => {
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

		loadBrands();
		loadColors();
	}, []);

	const handleChange = (criteria, id) => {
		const idCriteria = id;
		let searchCriteria;
		if (idCriteria === 'brand') {
			searchCriteria = { brand: criteria };
			setCriteria(searchCriteria);
		}
		if (idCriteria === 'color') {
			searchCriteria = { color: criteria };
			setCriteria(searchCriteria);
		}
	};

	return (
		<div>
			<Grid
				container
				spacing={1}
				style={{ flexWrap: 'wrap', margin: '0', width: '100%' }}
			>
				<Grid item xs={12} container>
					<SelectFilter
						valueCriteria={brands}
						text={'brandsCriteria'}
						id={'brand'}
						handleChangeBrand={handleChange}
					/>
					<SelectFilter
						valueCriteria={colors}
						text={'colorsCriteria'}
						id={'color'}
						handleChangeBrand={handleChange}
					/>
				</Grid>
				{products.map((product) => (
					<Grid
						item
						xs={6}
						sm={3}
						container
						justify="center"
						alignItems="center"
						direction="column"
						key={product.id}
					>
						<Product product={product} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default Products;
