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
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import * as React from 'react';
import { useState, useEffect } from 'react';

import useProduct from '../../hooks/useProduct';
import useProducts from '../../hooks/useProducts';

import DetailProduct from './DetailProduct';
import DialogNewStock from '../Admin/DialogNewStock';

import { createStock } from '../../services/detailSizeService';
import Notification from '../Notification';

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

const Product = ({ product, isAdmin = false }) => {
	const { getStockSize, stock, CallUpdateAccountVisit } = useProduct();
	const { loadSizes, sizes } = useProducts();
	const [open, setOpen] = useState(false);
	const [openNewStock, setOpenNewStock] = useState(false);
	const [addSuccess, setAddSuccess] = useState({
		error: false,
		success: false,
	});

	const handleClickOpen = () => {
		setOpen(true);
		getStockSize(product.id);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpenNewStock = () => {
		setOpenNewStock(true);
	};

	const handleCloseNewStock = () => {
		setOpenNewStock(false);
	};

	useEffect(() => {
		loadSizes();
	}, [loadSizes]);

	const classes = useStyles();

	return (
		<>
			{!isAdmin ? (
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
								alignItems="initial"
								direction="column"
							>
								<Grid item>
									<Typography variant="body2" color="primary">
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
			) : (
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
					</CardActionArea>

					<CardContent className={classes.footerCard}>
						<Stack direction="row" spacing={1}>
							<IconButton color="primary" onClick={handleClickOpenNewStock}>
								<AddIcon />
							</IconButton>
							<IconButton color="primary">
								<EditIcon />
							</IconButton>
							<IconButton color="primary">
								<DeleteIcon />
							</IconButton>
						</Stack>
					</CardContent>
				</Card>
			)}
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
					updateAccountVisitRef={CallUpdateAccountVisit}
				/>
			</Dialog>

			<Dialog
				open={openNewStock}
				onClose={handleCloseNewStock}
				TransitionComponent={Transition}
			>
				<DialogNewStock
					handleCloseRef={handleCloseNewStock}
					open={openNewStock}
					sizesRef={sizes}
					loadSizesRef={loadSizes}
					createStockRef={createStock}
					setAddSuccessRef={setAddSuccess}
					productRef={product}
				/>
			</Dialog>
			{addSuccess.success ? (
				<Notification type="success" text="Stock agregado correctamente" />
			) : (
				addSuccess.error && (
					<Notification type="error" tittle="Error" text=" ya existe" />
				)
			)}
		</>
	);
};

export default Product;
