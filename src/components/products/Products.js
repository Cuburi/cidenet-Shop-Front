import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Product from './Product';

const Products = () => {
	const [products, setproducts] = useState();
	const url = 'http://localhost:8080/product/list';

	const fetchApi = async () => {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: 'Yeah',
			},
			body: JSON.stringify({}),
		});
		//console.log(response.status);
		const responseJSON = await response.json();
		setproducts(responseJSON);
		//console.log(responseJSON);
	};

	useEffect(() => {
		fetchApi();
	}, []);
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
		</Grid>
	);
};

export default Products;
