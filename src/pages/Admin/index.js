import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import DialogNewProduct from '../../components/Admin/DialogNewProduct';

import { createBrand } from '../../services/brandService';
import { createProducts } from '../../services/productsService';
import { createColor } from '../../services/colorService';

import { useState, useEffect } from 'react';
import useProducts from '../../hooks/useProducts';
import Notification from '../../components/Notification';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const PageAdmin = () => {
	const { loadBrands, loadColors, loadSections, colors, brands, sections } =
		useProducts();

	useEffect(() => {
		loadBrands();
		loadColors();
		loadSections();
	}, [loadBrands, loadColors, loadSections]);

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
			<Button variant="outlined" onClick={handleClickOpenNewProduct}>
				Open form dialog
			</Button>

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
