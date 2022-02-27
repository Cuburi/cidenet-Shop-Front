import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { IMaskInput } from 'react-imask';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as React from 'react';

import useUser from '../../hooks/useUser';
import useChangePassword from '../../hooks/useChangePassword';

import Notification from '../../components/Notification';
import imageRegister from '../../assets/Login.jpg';
import DialogSendEmailChangePassword from '../../components/changePassword/DialogSendEmailChangePassword';
import DialogConfirmSendEmail from '../../components/changePassword/DialogConfirmSendEmail';

import { sendEmailConfirmAccount } from '../../services/registerService';
import DialogSendEmail from '../../components/checkout/DialogSendEmail';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
	const { onChange, ...other } = props;
	return (
		<IMaskInput
			{...other}
			mask={Number}
			definitions={{
				'#': /[1-9]/,
			}}
			inputRef={ref}
			onAccept={(value) => onChange({ target: { name: props.name, value } })}
			overwrite
		/>
	);
});

const Register = () => {
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			passwordConfirm: '',
			typeId: '',
			document: '',
			phone: '',
			address: '',
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.required('Nombre es requerido')
				.matches(/^[aA-zZ\s]+$/, 'Solo se permiten letras para este campo '),
			email: Yup.string()
				.email('Email no valido')
				.required('El email es requerido'),
			password: Yup.string()
				.required('Contraseña es requerida')
				.oneOf([Yup.ref('passwordConfirm')], 'Las contraseñas no son iguales ')
				.matches(
					/^.*(?=.{5,})((?=.*[/!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
					'Contraseña debe contener minimo 5 caracteres, una minúscula,una mayúscula, un número y un caracter especial'
				),
			passwordConfirm: Yup.string()
				.required('Confirmar la contraseña')
				.oneOf([Yup.ref('password')], 'Las contraseñas no son iguales '),
			typeId: Yup.string().required('Tipo de identificación requerido'),
			document: Yup.number()
				.required('documento requerido')
				.min(10000, 'Documento minimo de 5 digitos'),
			phone: Yup.number()
				.required('Número de teléfono requerido')
				.min(1000000, 'Telefono minimo de 7 digitos'),
			address: Yup.string().required('Dirección requerida'),
		}),
		onSubmit: async (user) => {
			const name = user.name;
			const email = user.email;
			const password = user.password;
			const typeId = user.typeId;
			const document = user.document;
			const phone = user.phone;
			const address = user.address;
			await register({
				name,
				email,
				password,
				typeId,
				document,
				phone,
				address,
			});
			sendEmailConfirmAccount({ mailTo: email });
			handleClickOpenSendEmail();
		},
	});
	const textEmail = 'Te hemos enviado un correo para que actives tu contraseña';
	const [values, setValues] = React.useState({
		showPassword: false,
	});
	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const { register, isRegisterLoading, hasRegisterError, message, isLogged } =
		useUser();
	const [openSendEmailChangePassword, setOpenSendEmailChangePassword] =
		useState(false);
	const [openConfirmSendEmail, setOpenConfirmSendEmail] = useState(false);
	const { sendEmailChangePassword, errorSendEmail } = useChangePassword();
	const [openSendEmail, setOpenSendEmail] = useState(false);
	const navigate = useNavigate();

	const optionsTypeId = [
		{
			value: 'CC',
			label: 'Cédula de ciudadania',
		},
		{
			value: 'TI',
			label: 'Tarjeta de identidad',
		},
	];

	useEffect(() => {
		if (isLogged) {
			return navigate('/');
		}
	}, [isLogged, navigate]);

	const openClickDialogSendEmail = () => {
		setOpenSendEmailChangePassword(true);
	};

	const handleCloseDialogSendEmail = () => {
		setOpenSendEmailChangePassword(false);
	};

	const openClickDialogConfirmSendEmail = () => {
		setOpenConfirmSendEmail(true);
	};

	const handleCloseConfirmSendEmail = () => {
		setOpenConfirmSendEmail(false);
		navigate('/');
	};

	const handleClickOpenSendEmail = () => {
		setOpenSendEmail(true);
	};

	const handleCloseSendEmail = () => {
		setOpenSendEmail(false);
		navigate('/');
	};

	return (
		<>
			<Grid container component="main" sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundColor: (t) =>
							t.palette.mode === 'light'
								? t.palette.grey[50]
								: t.palette.grey[900],
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					<img
						src={imageRegister}
						alt="login"
						style={{ width: '100%', height: '100%' }}
					/>
				</Grid>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography variant="h5">Sign in</Typography>
						<form onSubmit={formik.handleSubmit}>
							<Box noValidate sx={{ mt: 1 }}>
								<TextField
									value={formik.values.name}
									margin="normal"
									fullWidth
									id="name"
									label="Nombre"
									name="name"
									autoComplete="name"
									autoFocus
									error={formik.errors.name && Boolean(formik.errors.name)}
									onChange={formik.handleChange}
									helperText={formik.touched.name && formik.errors.name}
								/>
								<TextField
									value={formik.values.email}
									margin="normal"
									fullWidth
									id="email"
									label="Correo electronico"
									name="email"
									autoComplete="email"
									autoFocus
									error={formik.errors.email && Boolean(formik.errors.email)}
									onChange={formik.handleChange}
									helperText={formik.touched.email && formik.errors.email}
								/>
								<TextField
									value={formik.values.password}
									margin="normal"
									fullWidth
									name="password"
									label="Contraseña"
									type={values.showPassword ? 'text' : 'password'}
									id="password"
									error={
										formik.errors.password && Boolean(formik.errors.password)
									}
									helperText={formik.touched.password && formik.errors.password}
									onChange={formik.handleChange}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
												>
													{values.showPassword ? (
														<VisibilityOff color="primary" />
													) : (
														<Visibility color="primary" />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
								<TextField
									value={formik.values.passwordConfirm}
									margin="normal"
									fullWidth
									name="passwordConfirm"
									label="Confirmación de contraseña"
									type={values.showPassword ? 'text' : 'password'}
									id="passwordConfirm"
									error={
										formik.errors.passwordConfirm &&
										Boolean(formik.errors.passwordConfirm)
									}
									helperText={
										formik.touched.passwordConfirm &&
										formik.errors.passwordConfirm
									}
									onChange={formik.handleChange}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
												>
													{values.showPassword ? (
														<VisibilityOff color="primary" />
													) : (
														<Visibility color="primary" />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
								<Grid
									container
									rowSpacing={1}
									columnSpacing={{ xs: 1, sm: 2, md: 3 }}
								>
									<Grid item xs={6}>
										<FormControl fullWidth margin="normal">
											<TextField
												select
												fullWidth
												id="typeId"
												name="typeId"
												value={formik.values.typeId}
												label="Tipo de identificación"
												onChange={formik.handleChange}
												error={
													formik.errors.typeId && Boolean(formik.errors.typeId)
												}
												helperText={
													formik.touched.typeId && formik.errors.typeId
												}
											>
												{optionsTypeId.map((option) => (
													<MenuItem key={option.value} value={option.value}>
														{option.label}
													</MenuItem>
												))}
											</TextField>
										</FormControl>
									</Grid>
									<Grid item xs={6}>
										<TextField
											value={formik.values.document}
											margin="normal"
											fullWidth
											name="document"
											label="Número de identificación"
											type="document"
											id="document"
											error={
												formik.errors.document &&
												Boolean(formik.errors.document)
											}
											helperText={
												formik.touched.document && formik.errors.document
											}
											onChange={formik.handleChange}
											InputProps={{
												inputComponent: TextMaskCustom,
											}}
										/>
									</Grid>
								</Grid>

								<TextField
									value={formik.values.phone}
									margin="normal"
									fullWidth
									name="phone"
									label="Teléfono"
									type="phone"
									id="phone"
									error={formik.errors.phone && Boolean(formik.errors.phone)}
									helperText={formik.touched.phone && formik.errors.phone}
									onChange={formik.handleChange}
									InputProps={{
										inputComponent: TextMaskCustom,
									}}
								/>

								<TextField
									value={formik.values.address}
									margin="normal"
									fullWidth
									name="address"
									label="Dirección"
									type="address"
									id="address"
									error={
										formik.errors.address && Boolean(formik.errors.address)
									}
									helperText={formik.touched.address && formik.errors.address}
									onChange={formik.handleChange}
								/>

								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
									color="primary"
								>
									Register
								</Button>

								{isRegisterLoading && (
									<Box sx={{ width: '100%' }}>
										<LinearProgress />
									</Box>
								)}
								{hasRegisterError && (
									<Notification type="error" tittle="Error" text={message} />
								)}
								{errorSendEmail && (
									<Notification
										type="error"
										tittle="Error"
										text="Correo no existe"
									/>
								)}
							</Box>
						</form>
						<Grid item xs>
							<Link
								component="button"
								variant="body2"
								onClick={openClickDialogSendEmail}
							>
								¿Olvidaste tu contraseña?
							</Link>
						</Grid>
					</Box>
				</Grid>
			</Grid>
			<Dialog
				open={openSendEmailChangePassword}
				TransitionComponent={Transition}
				onClose={handleCloseDialogSendEmail}
			>
				<DialogSendEmailChangePassword
					handleCloseRef={handleCloseDialogSendEmail}
					sendEmailRef={sendEmailChangePassword}
					openConfirmSendEmailRef={openClickDialogConfirmSendEmail}
				/>
			</Dialog>

			<Dialog
				open={openConfirmSendEmail}
				TransitionComponent={Transition}
				onClose={handleCloseConfirmSendEmail}
			>
				<DialogConfirmSendEmail handleCloseRef={handleCloseConfirmSendEmail} />
			</Dialog>

			<Dialog
				open={openSendEmail}
				TransitionComponent={Transition}
				onClose={handleCloseSendEmail}
			>
				<DialogSendEmail
					handleCloseRef={handleCloseSendEmail}
					textRef={textEmail}
				/>
			</Dialog>
		</>
	);
};

export default Register;
