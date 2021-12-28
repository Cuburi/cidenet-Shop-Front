import { Grid } from '@mui/material';

import { useEffect } from 'react';
import useProducts from '../../hooks/useProducts';

import Product from './Product';
import SelectFilter from './SelectFilter';
import { makeStyles } from '@material-ui/core';
import SearchLine from './SearchLine';
import ButtonBases from '../../components/ButtonGroup';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
}));

const Products = () => {
	const classes = useStyles();

	const {
		loadProducts,
		loadBrands,
		loadColors,
		loadSections,
		handleChange,
		handleChangeClick,
		products,
		colors,
		sections,
		brands,
		searchCriteria,
	} = useProducts();

	useEffect(() => {
		loadProducts();
	}, [searchCriteria]);

	useEffect(() => {
		loadBrands();
		loadColors();
		loadSections();
	}, []);

	return (
		<div>
			<ButtonBases handleChangeClickRef={handleChangeClick} />
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
