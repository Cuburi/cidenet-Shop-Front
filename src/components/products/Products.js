import { Grid, Typography } from '@mui/material';
import Product from './Product';

const Products = () => {
	return (
		<Grid
			container
			spacing={1}
			style={{ flexWrap: 'wrap', margin: '0', width: '100%' }}
		>
			<Grid
				item
				xs={12}
				justify="center"
				container
				justify="center"
				alignItems="center"
				direction="column"
			>
				<Typography variant="h5" color="primary">
					Destacados
				</Typography>
			</Grid>
			<Grid
				item
				xs={6}
				sm={3}
				justify="center"
				container
				justify="center"
				alignItems="center"
				direction="column"
			>
				<Product />
			</Grid>
			<Grid
				item
				xs={6}
				sm={3}
				justify="center"
				container
				justify="center"
				alignItems="center"
				direction="column"
			>
				<Product />
			</Grid>
			<Grid
				item
				xs={6}
				sm={3}
				justify="center"
				container
				justify="center"
				alignItems="center"
				direction="column"
			>
				<Product />
			</Grid>
			<Grid
				item
				xs={6}
				sm={3}
				justify="center"
				container
				justify="center"
				alignItems="center"
				direction="column"
			>
				<Product />
			</Grid>
		</Grid>
	);
};

export default Products;
