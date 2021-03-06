import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as React from 'react';

import useChangePassword from '../../hooks/useChangePassword';
import useUser from '../../hooks/useUser';

import Notification from '../../components/Notification';
import imageLogin from '../../assets/Login1.jpg';
import DialogSendEmailChangePassword from '../../components/changePassword/DialogSendEmailChangePassword';
import DialogConfirmSendEmail from '../../components/changePassword/DialogConfirmSendEmail';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const Login = () => {
	const { login, isLogged, isLogginLoading, hasLoginError } = useUser();
	const [openSendEmailChangePassword, setOpenSendEmailChangePassword] =
		useState(false);
	const [openConfirmSendEmail, setOpenConfirmSendEmail] = useState(false);
	const navigate = useNavigate();
	const { sendEmailChangePassword, errorSendEmail } = useChangePassword();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Email no valido')
				.required('El email es requerido'),
			password: Yup.string().required('Contraseña es requerida'),
		}),
		onSubmit: (user) => {
			const userName = user.email;
			const password = user.password;
			login({ userName, password });
		},
	});

	useEffect(() => {
		if (isLogged) navigate(-1);
	}, [isLogged, navigate]);

	const openClickDialogSendEmail = () => {
		setOpenSendEmailChangePassword(true);
	};

	const handleCloseDialogSendEmail = () => {
		setOpenSendEmailChangePassword(false);
	};

	const openClickSendEmailChangePassword = () => {
		setOpenConfirmSendEmail(true);
	};

	const handleCloseConfirmSendEmail = () => {
		setOpenConfirmSendEmail(false);
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
						src={imageLogin}
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
						<Typography variant="h5">iniciar sesión</Typography>

						<Box noValidate sx={{ mt: 1 }}>
							<form onSubmit={formik.handleSubmit}>
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
									type="password"
									id="password"
									error={
										formik.errors.password && Boolean(formik.errors.password)
									}
									helperText={formik.touched.password && formik.errors.password}
									onChange={formik.handleChange}
								/>

								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
									color="primary"
								>
									iniciar sesión
								</Button>
								{isLogginLoading && (
									<Box sx={{ width: '100%' }}>
										<LinearProgress />
									</Box>
								)}

								{hasLoginError && (
									<Notification
										type="error"
										tittle="Error"
										text="email y/o contraseñas incorrectas"
									/>
								)}

								{errorSendEmail && (
									<Notification
										type="error"
										tittle="Error"
										text="Correo no existe"
									/>
								)}
							</form>
							<Grid container>
								<Grid item xs>
									<Link
										component="button"
										variant="body2"
										onClick={openClickDialogSendEmail}
									>
										¿Olvidaste tu contraseña?
									</Link>
								</Grid>
								<Grid item>
									<Link
										component="button"
										onClick={() => navigate('/register')}
										variant="body2"
									>
										¿No tienes una cuenta? Registrate
									</Link>
								</Grid>
							</Grid>
						</Box>
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
					openConfirmSendEmailRef={openClickSendEmailChangePassword}
				/>
			</Dialog>

			<Dialog
				open={openConfirmSendEmail && !errorSendEmail}
				TransitionComponent={Transition}
				onClose={handleCloseConfirmSendEmail}
			>
				<DialogConfirmSendEmail handleCloseRef={handleCloseConfirmSendEmail} />
			</Dialog>
		</>
	);
};

export default Login;
