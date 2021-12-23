import { makeStyles } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useUser from '../../hooks/useUser';
import useShoppingCart from '../../hooks/useShoppingCart';

import Footer from '../../components/Layout/Footer';
import TableShoppingCart from '../../components/checkout/TableShoppingCart';
import DialogConfirm from '../../components/checkout/DialogConfirm';

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
	const { isLogged } = useUser();
	const [openRemoveShoppingCart, setOpenRemoveShoppingCart] = useState(false);
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

	const handleClickOpenRemove = () => {
		setOpenRemoveShoppingCart(true);
	};

	const handleCloseRemove = (confirm) => {
		if (confirm) {
			removeShoppingCart();
			navigate('/');
		}
		setOpenRemoveShoppingCart(false);
	};
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
							onClick={() => (isLogged ? newStock() : navigate('/login'))}
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
			<Footer />
		</>
	);
};

export default Checkout;
