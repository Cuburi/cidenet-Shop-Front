import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Product from './Product';
import axios from 'axios';

const Products = () => {
	const [products, setproducts] = useState([]);
	const baseUrl = 'http://localhost:8080';

	const getProducts = async () => {
		try {
			const response = await axios({
				url: `${baseUrl}/product/list`,
				method: 'POST',
				data: {},
			});
			return response;
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const loadProducts = async () => {
			const response = await getProducts();
			if (response.status === 200) {
				setproducts(response.data);
			}
		};
		loadProducts();
	}, []);

	return (
		<div>
			<Grid
				container
				spacing={1}
				style={{ flexWrap: 'wrap', margin: '0', width: '100%' }}
			>
				<Grid
					item
					xs={12}
					container
					justify="center"
					alignItems="center"
					direction="column"
				>
					<Typography variant="h5" color="primary">
						Destacados
					</Typography>
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
