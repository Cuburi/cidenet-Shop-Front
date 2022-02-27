import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import NumberFormat from 'react-number-format';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import React, { useState } from 'react';

import DialogNewProp from './DialogNewProp';
import Notification from '../Notification';

const Input = styled('input')({
	display: 'none',
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '200px',
	},
}));

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
	props,
	ref
) {
	const { onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={ref}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			thousandSeparator
			isNumericString
			prefix="$"
		/>
	);
});

function DialogNewProduct({
	handlecloseRef,
	colorRef = [],
	brandRef = [],
	sectionRef = [],
	newProductRef,
	newBrandRef,
	newColorRef,
	loadBrandsRef,
	loadColorsRef,
	setAddSuccessRef,
	product = '',
	loadProductsRef,
}) {
	const classes = useStyles();
	const [dialogNewProp, setDialogNewProp] = useState(false);
	const [preloadImage, setPreloadImage] = useState(
		product === '' ? '' : product.image
	);
	const [prop, setProp] = useState('');
	const [addPropSuccess, setAddPropSuccess] = useState({
		error: false,
		success: false,
	});

	const formik = useFormik({
		initialValues:
			product === ''
				? {
						name: '',
						salePrice: '',
						brand: '',
						section: '',
						color: '',
						description: '',
						image: '',
				  }
				: {
						name: product.name,
						salePrice: product.salePrice,
						brand: brandRef.find((brand) => brand.name === product.brand.name),
						section: sectionRef.find(
							(section) => section.name === product.section.name
						),
						color: colorRef.find((color) => color.name === product.color.name),
						description: product.description,
						image: product.image,
				  },
		validationSchema: Yup.object({
			name: Yup.string().required('Nombre obligatorio'),
			salePrice: Yup.number()
				.required('Precio obligatorio.')
				.min(10000, 'Precio minimo 10,000	'),
			brand: Yup.object().required('Marca requerida.'),
			section: Yup.object().required('Sección requerida.'),
			color: Yup.object().required('Color requerido.'),
			description: Yup.string().required('Descripción requerida.'),
			image: Yup.string().required('imagen obligatoria'),
		}),
		onSubmit: async (formProduct) => {
			const newProduct = { ...formProduct, accountVisit: 0 };
			const response =
				product === ''
					? await newProductRef(newProduct)
					: await newProductRef(product.id, newProduct);
			if (response) {
				setAddSuccessRef({ error: false, success: true });
			} else {
				setAddSuccessRef({ error: true, success: false });
			}
			loadProductsRef();
			handlecloseRef();
		},
	});

	const handleClickOpenNewProp = (prop) => {
		setProp(prop);
		setAddPropSuccess({ error: false, success: false });
		setDialogNewProp(true);
	};

	const handleCloseNewProp = () => {
		setDialogNewProp(false);
	};

	const imageToBlob = async (event) => {
		const blobToBase64 = (blob) => {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onloadend = () => {
					resolve(reader.result.split(',')[1]);
				};
			});
		};
		const image = await blobToBase64(event.target.files[0]);
		setPreloadImage(image);
		formik.values.image = image;
	};

	return (
		<>
			<DialogTitle>Nuevo producto</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
				<DialogContent>
					<Grid
						container
						rowSpacing={1}
						columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					>
						<Grid item xs={12}>
							<TextField
								variant="standard"
								id="name"
								label="Nombre"
								name="name"
								fullWidth
								value={formik.values.name}
								onChange={formik.handleChange}
								error={formik.errors.name && Boolean(formik.errors.name)}
								helperText={formik.touched.name && formik.errors.name}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								select
								variant="standard"
								id="brand"
								label="Marca"
								name="brand"
								fullWidth
								defaultValue={product.brand}
								value={formik.values.brand}
								onChange={formik.handleChange}
								error={formik.errors.brand && Boolean(formik.errors.brand)}
								helperText={formik.touched.brand && formik.errors.brand}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={() => handleClickOpenNewProp('brand')}
											>
												<AddIcon />
											</IconButton>
										</InputAdornment>
									),
								}}
							>
								{brandRef.map((brand) => (
									<MenuItem value={brand} key={brand.id}>
										<em>{brand.name}</em>
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField
								select
								variant="standard"
								id="color"
								label="Color"
								name="color"
								fullWidth
								defaultValue={'a'}
								value={formik.values.color}
								onChange={formik.handleChange}
								error={formik.errors.color && Boolean(formik.errors.color)}
								helperText={formik.touched.color && formik.errors.color}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={() => handleClickOpenNewProp('color')}
											>
												<AddIcon />
											</IconButton>
										</InputAdornment>
									),
								}}
							>
								{colorRef.map((color) => (
									<MenuItem value={color} key={color.id}>
										<em>{color.name}</em>
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField
								select
								variant="standard"
								fullWidth
								id="section"
								name="section"
								label="section"
								value={formik.values.section}
								onChange={formik.handleChange}
								error={formik.errors.section && Boolean(formik.errors.section)}
								helperText={formik.touched.section && formik.errors.section}
							>
								{sectionRef.map((section) => (
									<MenuItem value={section} key={section.id}>
										<em>{section.name}</em>
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant="standard"
								fullWidth
								id="salePrice"
								name="salePrice"
								label="Precio"
								value={formik.values.salePrice}
								onChange={formik.handleChange}
								error={
									formik.errors.salePrice && Boolean(formik.errors.salePrice)
								}
								helperText={formik.touched.salePrice && formik.errors.salePrice}
								InputProps={{
									inputComponent: NumberFormatCustom,
								}}
							/>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="standard"
							id="description"
							label="Descripción"
							name="description"
							fullWidth
							value={formik.values.description}
							onChange={formik.handleChange}
							error={
								formik.errors.description && Boolean(formik.errors.description)
							}
							helperText={
								formik.touched.description && formik.errors.description
							}
						/>
					</Grid>

					<label htmlFor="image">
						<IconButton
							color={formik.errors.image ? 'error' : 'primary'}
							aria-label="upload picture"
							component="span"
						>
							<PhotoCamera />
						</IconButton>
					</label>
					<Input
						id="image"
						name="image"
						type="file"
						accept="image/*"
						onChange={imageToBlob}
						error={formik.errors.image}
					/>

					{preloadImage !== '' && (
						<img
							src={`data:image/jpeg;base64,${preloadImage}`}
							alt="producto"
							className={classes.img}
						/>
					)}
					{addPropSuccess.success ? (
						<Notification
							type="success"
							text={`${
								prop === 'brand' ? 'marca' : 'color'
							} creado correctamente`}
						/>
					) : (
						addPropSuccess.error && (
							<Notification
								type="error"
								tittle="Error"
								text={`${prop === 'brand' ? 'marca' : 'color'} ya existe`}
							/>
						)
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handlecloseRef}>Cancel</Button>
					<Button type="submit">Añadir</Button>
				</DialogActions>
			</form>
			<Dialog
				open={dialogNewProp}
				TransitionComponent={Transition}
				onClose={handleCloseNewProp}
			>
				<DialogNewProp
					handleCloseRef={handleCloseNewProp}
					namePropRef={prop}
					addPropRef={prop === 'brand' ? newBrandRef : newColorRef}
					loadPropRef={prop === 'brand' ? loadBrandsRef : loadColorsRef}
					setAddSuccessRef={setAddPropSuccess}
				/>
			</Dialog>
		</>
	);
}

export default DialogNewProduct;
