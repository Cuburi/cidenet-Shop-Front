import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import useShoppingCart from '../../hooks/useShoppingCart';
import { useEffect } from 'react';

const GreenSwitch = styled(Switch)(({ theme }) => ({
	'& .MuiSwitch-switchBase.Mui-checked': {
		color: theme.palette.primary.main,
	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
		backgroundColor: theme.palette.primary.main,
	},
}));

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: '100%',
	},
	image: {
		width: 128,
		height: 128,
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '500px',
	},
	detail: {
		minWidth: '50%',
		flex: '1',
		padding: '0 50px 0 40px',
		textAlign: 'lef',
		webkitBoxFlex: '1',
	},
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const DetailProduct = ({
	handleCloseRef,
	product = {},
	stock = [],
	updateAccountVisitRef,
}) => {
	const { addItemShoppingCart } = useShoppingCart();
	const classes = useStyles();
	const formik = useFormik({
		initialValues: {
			size: '',
			amount: '',
		},
		validationSchema: Yup.object({
			size: Yup.object().required('Seleccione un talla'),
			amount: Yup.number()
				.required('Indique la cantidad')
				.min(1, 'catidad minima 1'),
		}),
		onSubmit: (item) => {
			const addItem = {
				size: item.size,
				acount:
					formik.values.amount > formik.values.size.stock
						? formik.values.size.stock
						: formik.values.amount,
			};
			addItemShoppingCart(addItem);

			handleCloseRef();
		},
	});
	useEffect(() => {
		updateAccountVisitRef(product.id);
	}, [updateAccountVisitRef, product.id]);

	return (
		<Grid className={classes.root}>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleCloseRef}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Grid container>
				<Grid item>
					<Box className={classes.paper}>
						<img
							src={`data:image/jpeg;base64,${product.image}`}
							className={classes.img}
							alt={product}
						/>
					</Box>
				</Grid>
				<Grid item xs={12} sm container className={classes.detail}>
					<Grid item xs container direction="column" spacing={2}>
						<Grid item xs>
							<Typography
								variant="h5"
								sx={{
									fontWeight: 'bold',
									marginBottom: 5,
									marginTop: 5,
									fontSize: '30px',
								}}
							>
								{product.name}
							</Typography>
							<Typography
								variant="h6"
								sx={{ marginBottom: 5, fontSize: '30px' }}
							>
								{` ${Intl.NumberFormat('es-MX', {
									style: 'currency',
									currency: 'MXN',
									minimumFractionDigits: 0,
								}).format(product.salePrice)}`}
							</Typography>

							<Typography variant="body1">{product.description}</Typography>
							<Typography variant="h6" sx={{ marginBottom: 5, marginTop: 5 }}>
								{`Marca: ${product.brand.name}`}
							</Typography>
							<Typography variant="h6" sx={{ marginBottom: 5 }}>
								{`Color: ${product.color.name}`}
							</Typography>
						</Grid>

						<Grid item>
							<form onSubmit={formik.handleSubmit}>
								<Grid
									container
									rowSpacing={1}
									columnSpacing={{ xs: 1, sm: 2, md: 3 }}
								>
									<Grid item xs={6}>
										<TextField
											select
											fullWidth
											id="size"
											name="size"
											label="Talla"
											value={formik.values.size}
											onChange={formik.handleChange}
											error={formik.errors.size && Boolean(formik.errors.size)}
											helperText={formik.touched.size && formik.errors.size}
										>
											{stock.map((size) => {
												return (
													<MenuItem key={size.size.name} value={size}>
														{size.size.name}
													</MenuItem>
												);
											})}
										</TextField>
										{formik.values.size !== '' &&
											(formik.values.size.stock > 0 ? (
												<FormControlLabel
													control={
														<GreenSwitch {...label} disabled defaultChecked />
													}
													label={'Disponible: ' + formik.values.size.stock}
												/>
											) : (
												<FormControlLabel
													control={<GreenSwitch {...label} disabled />}
													label="No disponible"
												/>
											))}
									</Grid>
									<Grid item xs={6}>
										{formik.values.size.stock <= 0 ? (
											<TextField
												disabled
												type="number"
												id="amount"
												name="amount"
												label="Cantidad"
												value={
													formik.values.amount > formik.values.size.stock
														? formik.values.size.stock
														: formik.values.amount
												}
												onChange={formik.handleChange}
											/>
										) : (
											<TextField
												type="number"
												id="amount"
												name="amount"
												label="Cantidad"
												value={
													formik.values.amount > formik.values.size.stock
														? formik.values.size.stock
														: formik.values.amount
												}
												onChange={formik.handleChange}
												error={
													formik.errors.amount && Boolean(formik.errors.amount)
												}
												helperText={
													formik.touched.amount && formik.errors.amount
												}
											/>
										)}
									</Grid>
								</Grid>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
									color="primary"
								>
									Añadir a mi carrito
								</Button>
							</form>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default DetailProduct;
