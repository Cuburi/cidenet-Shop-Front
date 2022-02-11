import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import React from 'react';

function DialogNewStock({
	handleCloseRef,
	sizesRef,
	createStockRef,
	setAddSuccessRef,
	productRef,
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
			const idSize = stock.size.id;
			const idProduct = productRef.id;
			const newStock = { idSize, ...stock, idProduct, product: productRef };
			const response = await createStockRef(newStock);
			if (response) {
				setAddSuccessRef({ error: false, success: true });
			} else {
				setAddSuccessRef({ error: true, success: false });
			}
			handleCloseRef();
		},
	});
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
						<Grid item xs={6}>
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
						<Grid item xs={6}>
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
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseRef}>Cancel</Button>
					<Button type="submit">Añadir</Button>
				</DialogActions>
			</form>
		</>
	);
}

export default DialogNewStock;
