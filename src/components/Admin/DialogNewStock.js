import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DialogConfirmDelete from '../../components/Admin/DialogConfirmDelete';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Notification from '../Notification';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import React, { useEffect, useState } from 'react';
import { deleteStock } from '../../services/detailSizeService';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
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

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function DialogNewStock({
	handleCloseRef,
	sizesRef,
	createStockRef,
	setAddSuccessRef,
	productRef,
	stockRef = [],
	getStockSizeRef,
}) {
	const formik = useFormik({
		initialValues: {
			size: '',
			stock: '',
		},
		validationSchema: Yup.object({
			size: Yup.object().required('Talla requerida.'),
			stock: Yup.number()
				.required('Cantidad requerida.')
				.min(1, 'catidad minima 1'),
		}),
		onSubmit: async (stock) => {
			setAddSuccessRef({
				error: false,
				success: false,
			});
			const idSize = stock.size.id;
			const idProduct = productRef.id;
			const newStock = { idSize, ...stock, idProduct, product: productRef };
			const response = await createStockRef(newStock);
			if (response) {
				setAddSuccessRef({ error: false, success: true });
			} else {
				setAddSuccessRef({ error: true, success: false });
			}
			getStockSizeRef(productRef.id);
		},
	});

	useEffect(() => {
		getStockSizeRef(productRef.id);
	}, [getStockSizeRef, productRef.id]);

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [detailStock, setdetailStock] = useState({});
	const [removeSuccess, setRemoveSuccess] = useState({
		error: false,
		success: false,
	});
	const handleClickOpenDeleteProduct = (idSize, idProduct) => {
		setdetailStock({ idSize, idProduct });
		setRemoveSuccess({
			error: false,
			success: false,
		});

		setOpenDeleteDialog(true);
	};

	const handleCloseDeleteProduct = async (confirm) => {
		if (confirm) {
			const response = await deleteStock(
				detailStock.idSize,
				detailStock.idProduct
			);
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
		getStockSizeRef(detailStock.idProduct);
		setOpenDeleteDialog(false);
	};
	return (
		<>
			<DialogTitle>Nuevo stock</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
				<DialogContent>
					<Grid
						container
						rowSpacing={1}
						columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					>
						<Grid item xs={5}>
							<TextField
								select
								variant="standard"
								id="size"
								label="Talla"
								name="size"
								fullWidth
								value={formik.values.size}
								onChange={formik.handleChange}
								error={formik.errors.size && Boolean(formik.errors.size)}
								helperText={formik.touched.size && formik.errors.size}
							>
								{sizesRef.map((size) => (
									<MenuItem value={size} key={size.id}>
										<em>{size.name}</em>
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={5}>
							<TextField
								variant="standard"
								type="number"
								id="stock"
								label="Stock"
								name="stock"
								fullWidth
								value={formik.values.stock}
								onChange={formik.handleChange}
								error={formik.errors.stock && Boolean(formik.errors.stock)}
								helperText={formik.touched.stock && formik.errors.stock}
							></TextField>
						</Grid>
						<Grid item xs={2}>
							<Button
								type="submit"
								variant="contained"
								endIcon={<AddCircleOutlineIcon />}
							>
								Añadir
							</Button>
						</Grid>
					</Grid>
				</DialogContent>
			</form>

			<Grid sx={{ margin: 1 }}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 600 }} size="small">
						<TableHead>
							<TableRow>
								<StyledTableCell align="left">Talla</StyledTableCell>
								<StyledTableCell align="left">Stock</StyledTableCell>
								<StyledTableCell align="left">Acción</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{stockRef.map((size) => (
								<StyledTableRow key={size.size.name}>
									<StyledTableCell component="th" scope="row">
										{size.size.name}
									</StyledTableCell>
									<StyledTableCell align="left">{size.stock}</StyledTableCell>
									<StyledTableCell align="left">
										<IconButton
											color="primary"
											onClick={() =>
												handleClickOpenDeleteProduct(
													size.idSize,
													size.idProduct
												)
											}
										>
											<DeleteIcon />
										</IconButton>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>

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

			<DialogActions>
				<Button onClick={handleCloseRef}>Cerrar</Button>
			</DialogActions>

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
}

export default DialogNewStock;
