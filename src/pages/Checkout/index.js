import { makeStyles } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useUser from '../../hooks/useUser';
import useShoppingCart from '../../hooks/useShoppingCart';
import useCheckout from '../../hooks/useCheckout';

import Footer from '../../components/Layout/Footer';
import TableShoppingCart from '../../components/checkout/TableShoppingCart';
import DialogConfirm from '../../components/checkout/DialogConfirm';
import DialogConfirmAddress from '../../components/checkout/DialogConfirmAddress';
import DialogSendEmail from '../../components/checkout/DialogSendEmail';
import DialogErrorStock from '../../components/checkout/DialogErrorStock';

const useStyles = makeStyles(({ theme }) => ({
	root: {
		padding: '30px 50px 50px 50px',
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

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const Checkout = () => {
	const classes = useStyles();
	const navigate = useNavigate();
	const { isLogged, user, getUserByEmail } = useUser();
	const [openRemoveShoppingCart, setOpenRemoveShoppingCart] = useState(false);
	const [openConfirmAddress, setOpenConfirmAddress] = useState(false);
	const [openSendEmail, setOpenSendEmail] = useState(false);
	const [openErrorStock, setOpenErrorStock] = useState(false);
	const {
		shoppingCart,
		totalPrice,
		removeItemShoppingCart,
		addItemShoppingCart,
		removeShoppingCart,
		newStock,
		totalPriceShoppingCart,
		checkStock,
	} = useShoppingCart();
	const { newSale } = useCheckout();
	useEffect(() => {
		totalPriceShoppingCart();
	}, [totalPriceShoppingCart]);
	const handleClickOpenRemove = () => {
		setOpenRemoveShoppingCart(true);
	};

	const handleClickOpenConfirmAddress = () => {
		getUserByEmail(window.sessionStorage.getItem('email'));
		setOpenConfirmAddress(true);
	};

	const handleCloseRemove = (confirm) => {
		if (confirm) {
			removeShoppingCart();
			navigate('/');
		}
		setOpenRemoveShoppingCart(false);
	};

	const handleCloseConfirmAddress = () => {
		setOpenConfirmAddress(false);
	};

	const handleClickOpenSendEmail = () => {
		setOpenSendEmail(true);
	};

	const handleCloseSendEmail = () => {
		setOpenSendEmail(false);
		navigate('/');
	};

	const handleClickOpenErrorStock = () => {
		setOpenErrorStock(true);
	};

	const handleCloseErrorStock = () => {
		setOpenErrorStock(false);
	};

	useEffect(() => {
		isLogged && getUserByEmail(window.sessionStorage.getItem('email'));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Grid className={classes.root}>
				<Grid style={{ maxHeight: '400px', overflow: 'overley' }}>
					<TableShoppingCart
						shoppingCart={shoppingCart}
						addItemShoppingCart={addItemShoppingCart}
						removeItemShoppingCart={removeItemShoppingCart}
					/>
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
							onClick={() => handleClickOpenRemove()}
						>
							Borrar mi pedido
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={() =>
								isLogged
									? shoppingCart.length > 0
										? handleClickOpenConfirmAddress()
										: navigate('/')
									: navigate('/login')
							}
						>
							Hacer compra
						</Button>
					</Stack>
				</Grid>
			</Grid>
			<Dialog
				open={openRemoveShoppingCart}
				TransitionComponent={Transition}
				onClose={handleCloseRemove}
			>
				<DialogConfirm handleCloseRef={handleCloseRemove} />
			</Dialog>
			<Dialog
				open={openConfirmAddress}
				TransitionComponent={Transition}
				onClose={handleCloseConfirmAddress}
			>
				<DialogConfirmAddress
					handleCloseRef={handleCloseConfirmAddress}
					userRef={user}
					newSaleRef={newSale}
					totalPriceRef={totalPrice}
					shoppingCartRef={shoppingCart}
					removeShoppingCartRef={removeShoppingCart}
					newStockRef={newStock}
					openSendEmailRef={handleClickOpenSendEmail}
					checkStockRef={checkStock}
					openErrorStockRef={handleClickOpenErrorStock}
				/>
			</Dialog>
			<Dialog
				open={openSendEmail}
				TransitionComponent={Transition}
				onClose={handleCloseSendEmail}
			>
				<DialogSendEmail handleCloseRef={handleCloseSendEmail} />
			</Dialog>
			<Dialog
				open={openErrorStock}
				TransitionComponent={Transition}
				onClose={handleCloseErrorStock}
			>
				<DialogErrorStock handleCloseRef={handleCloseErrorStock} />
			</Dialog>
			<Footer />
		</>
	);
};

export default Checkout;
