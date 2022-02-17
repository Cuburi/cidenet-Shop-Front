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
import DialogConfirmDelete from '../../components/Admin/DialogConfirmDelete';
import Notification from '../Notification';

import { createStock } from '../../services/detailSizeService';
import { deleteProducts } from '../../services/detailSizeService';

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

const Product = ({
	product,
	isAdmin = false,
	loadProductsRef,
	setEditProductRef,
}) => {
	const { getStockSize, stock, CallUpdateAccountVisit } = useProduct();
	const { loadSizes, sizes } = useProducts();
	const [open, setOpen] = useState(false);
	const [openNewStock, setOpenNewStock] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [addSuccess, setAddSuccess] = useState({
		error: false,
		success: false,
	});
	const [removeSuccess, setRemoveSuccess] = useState({
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
		loadProductsRef();
		setOpenNewStock(false);
	};

	const handleClickOpenDeleteProduct = () => {
		setRemoveSuccess({
			error: false,
			success: false,
		});
		setOpenDeleteDialog(true);
	};

	const handleCloseDeleteProduct = async (confirm) => {
		if (confirm) {
			const response = await deleteProducts(product.id);
			response
				? setRemoveSuccess({
						error: false,
						success: true,
				  })
				: setRemoveSuccess({
						error: true,
						success: false,
				  });
		}
		loadProductsRef();
		setOpenDeleteDialog(false);
	};

	useEffect(() => {
		loadSizes();
	}, [loadSizes]);

	const classes = useStyles();

	const editProduct = () => {
		setEditProductRef(product);
	};

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
					{product.active ? (
						<CardActionArea onClick={handleClickOpen}>
							<CardMedia
								component="img"
								height="300"
								image={`data:image/jpeg;base64,${product.image}`}
								alt="green iguana"
							/>
						</CardActionArea>
					) : (
						<CardActionArea>
							<CardMedia
								component="img"
								height="300"
								image={`data:image/jpeg;base64,${product.image}`}
								alt="green iguana"
							/>
						</CardActionArea>
					)}

					<CardContent
						className={classes.footerCard}
						style={{ backgroundColor: !product.active && 'gray' }}
					>
						<Stack direction="row" spacing={3}>
							<IconButton color="primary" onClick={handleClickOpenNewStock}>
								<AddIcon />
							</IconButton>
							<IconButton color="primary" onClick={editProduct}>
								<EditIcon />
							</IconButton>
							{!product.active ? (
								<IconButton disabled color="primary">
									<DeleteIcon />
								</IconButton>
							) : (
								<IconButton
									color="primary"
									onClick={handleClickOpenDeleteProduct}
								>
									<DeleteIcon />
								</IconButton>
							)}
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
					stockRef={stock}
					getStockSizeRef={getStockSize}
				/>
			</Dialog>

			<Dialog
				open={openDeleteDialog}
				TransitionComponent={Transition}
				onClose={() => handleCloseDeleteProduct(false)}
			>
				<DialogConfirmDelete
					handleCloseRef={handleCloseDeleteProduct}
					textRef={'producto'}
				/>
			</Dialog>
			{addSuccess.success ? (
				<Notification type="success" text="Stock agregado correctamente" />
			) : (
				addSuccess.error && (
					<Notification type="error" tittle="Error" text=" ya existe" />
				)
			)}
			{removeSuccess.success ? (
				<Notification type="success" text="Producto eliminado correctamente" />
			) : (
				removeSuccess.error && (
					<Notification
						type="error"
						tittle="Error"
						text="Error al eliminar el producto"
					/>
				)
			)}
		</>
	);
};

export default Product;
