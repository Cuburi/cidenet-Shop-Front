import { makeStyles } from '@material-ui/core';
import Slide from '@mui/material/Slide';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/system/Box';
import Dialog from '@mui/material/Dialog';

import * as React from 'react';
import { useState } from 'react';

import useProduct from '../../hooks/useProduct';
import DetailProduct from './DetailProduct';

const useStyles = makeStyles(() => ({
	price: {
		alignContent: 'center',
	},
	footerCard: {
		backgroundColor: '#F0F3F8',
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const Product = ({ product }) => {
	const { getStockSize, stock } = useProduct();
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
		getStockSize(product.id);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const classes = useStyles();

	return (
		<>
			<Card
				sx={{ maxWidth: 200, maxHeight: 486 }}
				style={{ border: 'none', boxShadow: 'none' }}
			>
				<CardActionArea onClick={handleClickOpen}>
					<CardMedia
						component="img"
						height="300"
						image={`data:image/jpeg;base64,${product.image}`}
						alt="green iguana"
					/>
					<CardContent className={classes.footerCard}>
						<Grid
							container
							justify="center"
							alignItems="center"
							direction="column"
						>
							<Grid item>
								<Typography variant="h8" color="primary">
									{product.name}
								</Typography>
							</Grid>
						</Grid>
						<Grid container spacing={8}>
							<Grid item xs={6}>
								<Box>
									<Typography
										variant="body2"
										color="primary"
										sx={{ fontWeight: 'bold' }}
									>
										Precio
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={6}>
								<Box>
									<Typography variant="body2" color="primary">
										{new Intl.NumberFormat('es-MX', {
											style: 'currency',
											currency: 'MXN',
											minimumFractionDigits: 0,
										}).format(product.salePrice)}
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</CardContent>
				</CardActionArea>
			</Card>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<DetailProduct
					handleCloseRef={handleClose}
					open={open}
					product={product}
					stock={stock}
				/>
			</Dialog>
		</>
	);
};

export default Product;
