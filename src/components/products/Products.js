import { Grid } from '@mui/material';
import Product from './Product';

const Products = () => {
	return (
		<Grid container spacing={2} style={{ flexWrap: 'wrap', margin: '30px' }}>
			<Grid item xs={6} sm={3}>
				<Product />
			</Grid>
			<Grid item xs={6} sm={3}>
				<Product />
			</Grid>
			<Grid item xs={6} sm={3}>
				<Product />
			</Grid>
			<Grid item xs={6} sm={3}>
				<Product />
			</Grid>
		</Grid>
	);
};

export default Products;
