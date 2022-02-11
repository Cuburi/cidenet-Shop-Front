import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core';

import DialogNewProduct from '../../components/Admin/DialogNewProduct';
import SelectFilter from '../../components/products/SelectFilter';
import SearchLine from '../../components/products/SearchLine';

import { createBrand } from '../../services/brandService';
import { createProducts } from '../../services/productsService';
import { createColor } from '../../services/colorService';

import { useState, useEffect } from 'react';

import useProducts from '../../hooks/useProducts';

import Notification from '../../components/Notification';
import Product from '../../components/products/Product';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
}));

const PageAdmin = () => {
	const classes = useStyles();
	const {
		loadProductsAdmin,
		loadProductsByOrderAdmin,
		loadBrands,
		loadColors,
		loadSections,
		products,
		colors,
		brands,
		sections,
		handleChange,
		searchCriteria,
	} = useProducts();

	useEffect(() => {
		loadBrands();
		loadColors();
		loadSections();
	}, [loadBrands, loadColors, loadSections]);

	useEffect(() => {
		if (Object.keys(searchCriteria).length === 0) {
			loadProductsByOrderAdmin();
		} else {
			loadProductsAdmin();
		}
	}, [loadProductsByOrderAdmin, loadProductsAdmin, searchCriteria]);

	const [opendialogNewProduct, setOpenDialogNewProduct] = useState(false);
	const [addSuccess, setAddSuccess] = useState({
		error: false,
		success: false,
	});

	const handleClickOpenNewProduct = () => {
		setAddSuccess({ error: false, success: false });
		setOpenDialogNewProduct(true);
	};

	const handleCloseNewProduct = () => {
		setOpenDialogNewProduct(false);
	};

	return (
		<>
			<Grid
				container
				spacing={1}
				style={{ flexWrap: 'wrap', margin: '0', width: '100%' }}
			>
				<Grid
					item
					container
					sx={{
						width: '90%',
						marginLeft: 'auto',
						marginRight: 'auto',
						padding: '10px',
					}}
				>
					<SelectFilter
						valueCriteria={brands}
						text={'Marcas'}
						id={'brand'}
						handleChangeRef={handleChange}
					/>

					<SelectFilter
						valueCriteria={colors}
						text={'Colores'}
						id={'color'}
						handleChangeRef={handleChange}
					/>

					<Button variant="outlined" onClick={handleClickOpenNewProduct}>
						Nuevo producto
					</Button>

					<div className={classes.grow}></div>

					<SearchLine handleChangeRef={handleChange} id={'description'} />
				</Grid>

				{products.map((product) => (
					<Grid
						item
						xs={6}
						sm={3}
						container
						justify="center"
						alignItems="center"
						direction="column"
						key={product.id}
					>
						<Product product={product} isAdmin={true} />
					</Grid>
				))}
			</Grid>

			<Dialog
				open={opendialogNewProduct}
				TransitionComponent={Transition}
				onClose={handleCloseNewProduct}
			>
				<DialogNewProduct
					handleclosRef={handleCloseNewProduct}
					colorRef={colors}
					loadColorsRef={loadColors}
					brandRef={brands}
					loadBrandsRef={loadBrands}
					sectionRef={sections}
					newProductRef={createProducts}
					newBrandRef={createBrand}
					newColorRef={createColor}
					setAddSuccessRef={setAddSuccess}
				/>
			</Dialog>
			{addSuccess.success ? (
				<Notification type="success" text="Producto creado correctamente" />
			) : (
				addSuccess.error && (
					<Notification type="error" tittle="Error" text="Producto ya existe" />
				)
			)}
		</>
	);
};
export default PageAdmin;
