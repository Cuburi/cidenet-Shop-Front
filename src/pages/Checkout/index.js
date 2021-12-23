import { makeStyles } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useUser from '../../hooks/useUser';
import useShoppingCart from '../../hooks/useShoppingCart';

import Footer from '../../components/Layout/Footer';

const useStyles = makeStyles(({ theme }) => ({
	root: {
		padding: '30px 50px 50px 50px',
	},
	image: {
		width: 128,
		height: 128,
	},
	iconBtn: {
		backgroundColor: 'black',
		color: 'white',
	},
	grow: {
		flexGrow: 1,
	},
	footer: {
		margin: '20px',
	},
	btn: {
		padding: '10px',
	},
	divider: {
		padding: '15px',
	},
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.black,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const Checkout = () => {
	const classes = useStyles();
	const navigate = useNavigate();
	const { isLogged } = useUser();
	const {
		shoppingCart,
		totalPrice,
		removeItemShoppingCart,
		addItemShoppingCart,
		removeShoppingCart,
		newStock,
		totalPriceShoppingCart,
	} = useShoppingCart();

	useEffect(() => {
		totalPriceShoppingCart();
	}, [totalPriceShoppingCart]);

	return (
		<>
			<Grid className={classes.root}>
				<Grid style={{ maxHeight: '400px', overflow: 'overley' }}>
					<Paper
						sx={{
							width: '100%',
						}}
					>
						<TableContainer sx={{ maxHeight: 400 }}>
							<Table
								stickyHeader
								sx={{ minWidth: 500 }}
								aria-label="sticky table"
							>
								<TableHead>
									<TableRow>
										<StyledTableCell>Poducto</StyledTableCell>
										<StyledTableCell>Nombre</StyledTableCell>
										<StyledTableCell>Talla</StyledTableCell>
										<StyledTableCell>Precio</StyledTableCell>
										<StyledTableCell>Cantidad</StyledTableCell>
										<StyledTableCell>Total</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{shoppingCart.map((product) => (
										<StyledTableRow
											key={product.size.idProduct + '' + product.size.idSize}
										>
											<StyledTableCell component="th" scope="row">
												<img
													src={`data:image/jpeg;base64,${product.size.product.image}`}
													className={classes.image}
													alt="Producto"
												/>
											</StyledTableCell>
											<StyledTableCell>
												{product.size.product.name}
											</StyledTableCell>
											<StyledTableCell>
												{product.size.size.name}
											</StyledTableCell>
											<StyledTableCell>{` ${Intl.NumberFormat('es-MX', {
												style: 'currency',
												currency: 'MXN',
												minimumFractionDigits: 0,
											}).format(
												product.size.product.salePrice
											)}`}</StyledTableCell>
											<StyledTableCell>
												<Box
													sx={{
														display: 'flex',
														alignItems: 'center',
														pl: 1,
														pb: 1,
													}}
												>
													<IconButton
														onClick={() => removeItemShoppingCart(product)}
													>
														<RemoveIcon className={classes.iconBtn} />
													</IconButton>

													{product.acount}

													<IconButton
														onClick={() =>
															addItemShoppingCart({ ...product, acount: 1 })
														}
													>
														<AddIcon className={classes.iconBtn} />
													</IconButton>
												</Box>
											</StyledTableCell>
											<StyledTableCell>{` ${Intl.NumberFormat('es-MX', {
												style: 'currency',
												currency: 'MXN',
												minimumFractionDigits: 0,
											}).format(
												product.size.product.salePrice * product.acount
											)}`}</StyledTableCell>
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</Grid>
				<Divider className={classes.divider} />
				<Grid container>
					<div className={classes.grow}></div>

					<Grid className={classes.footer}>
						<Typography
							variant="h4"
							color="primary"
							sx={{ fontWeight: 'bold' }}
						>
							TOTAL:
						</Typography>
					</Grid>
					<Grid className={classes.footer}>
						<Typography variant="h4" color="primary">
							{new Intl.NumberFormat('es-MX', {
								style: 'currency',
								currency: 'MXN',
								minimumFractionDigits: 0,
							}).format(totalPrice)}
						</Typography>
					</Grid>
				</Grid>

				<Grid container spacing={2}>
					<div className={classes.grow}></div>
					<Stack direction="row" spacing={2}>
						<Button
							variant="contained"
							color="primary"
							onClick={() => navigate('/')}
						>
							Seguir comprando
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={() => removeShoppingCart()}
						>
							Borrar mi pedido
						</Button>
						<Button variant="contained" color="primary" onClick={newStock}>
							Hacer compra
						</Button>
					</Stack>
				</Grid>
			</Grid>
			<Footer />
		</>
	);
};

export default Checkout;
