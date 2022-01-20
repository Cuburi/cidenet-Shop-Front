import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const DialogConfirmAddress = ({
	handleCloseRef,
	userRef,
	newSaleRef,
	totalPriceRef,
	shoppingCartRef,
	removeShoppingCartRef,
	newStockRef,
	openSendEmailRef,
}) => {
	const formik = useFormik({
		initialValues: {
			saleAddress: userRef.address,
		},
		validationSchema: Yup.object({
			saleAddress: Yup.string().required('Es necesario un dirección'),
		}),
		onSubmit: async (sale) => {
			const dateNow = new Date().toISOString();
			await newSaleRef(
				sale.saleAddress,
				dateNow,
				totalPriceRef,
				userRef,
				shoppingCartRef
			);
			newStockRef();
			removeShoppingCartRef();
			handleCloseRef();
			openSendEmailRef();
		},
	});
	return (
		<>
			<DialogTitle>Confirmación de dirección de entrega</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
				<DialogContent>
					<DialogContentText>
						Recuerda que la compra es a contra entrega, por tal motivo es
						necesario que nos indiques la dirección donde llegará el pedido.
					</DialogContentText>

					<TextField
						id="saleAddress"
						name="saleAddress"
						autoFocus
						margin="dense"
						label="Dirección"
						fullWidth
						variant="standard"
						error={
							formik.errors.saleAddress && Boolean(formik.errors.saleAddress)
						}
						helperText={formik.touched.saleAddress && formik.errors.saleAddress}
						onChange={formik.handleChange}
						value={formik.values.saleAddress}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleCloseRef()}>Cancelar</Button>
					<Button type="submit">Confirmar</Button>
				</DialogActions>
			</form>
		</>
	);
};

export default DialogConfirmAddress;
