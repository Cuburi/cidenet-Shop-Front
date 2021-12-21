import { Grid, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Product from './Product';
import SelectFilter from './SelectFilter';
import { getBrands } from '../../services/brandService';
import { getColors } from '../../services/colorService';
import { getProducts } from '../../services/productsService';
import { getSections } from '../../services/sectionService';
import { makeStyles } from '@material-ui/core';
import SearchLine from './SearchLine';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
}));

const Products = () => {
	const classes = useStyles();

	const [products, setproducts] = useState([]);
	const [brands, setBrands] = useState([]);
	const [colors, setColors] = useState([]);
	const [sections, setSections] = useState([]);
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

		const loadSections = async () => {
			const response = await getSections();
			if (response.status === 200) {
				setSections(response.data);
			}
		};

		loadBrands();
		loadColors();
		loadSections();
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
		if (idCriteria === 'description') {
			searchCriteria = { description: criteria };
			setCriteria(searchCriteria);
		}
		if (idCriteria === 'section') {
			searchCriteria = { section: criteria };
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
				<Grid
					item
					container
					sx={{
						width: '90%',

						marginLeft: 'auto',
						marginRight: 'auto',
						padding: '10px',
					}}
				>
					<SelectFilter
						valueCriteria={brands}
						text={'Marcas'}
						id={'brand'}
						handleChangeRef={handleChange}
					/>

					<SelectFilter
						valueCriteria={colors}
						text={'Colores'}
						id={'color'}
						handleChangeRef={handleChange}
					/>

					<SelectFilter
						valueCriteria={sections}
						text={'Secciones'}
						id={'section'}
						handleChangeRef={handleChange}
					/>

					<div className={classes.grow}></div>

					<SearchLine handleChangeRef={handleChange} id={'description'} />
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
