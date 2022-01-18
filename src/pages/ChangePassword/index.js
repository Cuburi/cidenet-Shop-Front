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
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import Notification from '../../components/Notification';

import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import useChangePassword from '../../hooks/useChangePassword';

import DialogConfirmChangePassword from '../../components/changePassword/DialogConfirmChangePassword';

import imageLogin from '../../assets/Login1.jpg';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const ChangePassword = () => {
	const { callChangePassword, errorChangePassword, loadingChangePassword } =
		useChangePassword();

	const navigate = useNavigate();

	const { tokenPassword } = useParams();

	const [, setOpenDialogConfirmChangePassword] = useState(false);

	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.required('Contraseña es requerida')
				.oneOf([Yup.ref('confirmPassword')], 'Las contraseñas no son iguales ')
				.matches(
					/^.*(?=.{5,})((?=.*[/!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
					'Contraseña debe contener minimo 5 caracteres, una minúscula,una mayúscula, un número y un caracter especial'
				),
			confirmPassword: Yup.string()
				.required('Confirmar la contraseña')
				.oneOf([Yup.ref('password')], 'Las contraseñas no son iguales '),
		}),
		onSubmit: (changePassword) => {
			console.log(changePassword);
			callChangePassword({
				password: changePassword.password,
				confirmPassword: changePassword.confirmPassword,
				tokenPassword,
			});
			console.log(errorChangePassword);
		},
	});

	const handleCloseConfirmChangePassword = () => {
		setOpenDialogConfirmChangePassword(false);
		navigate('/login');
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
						<Typography variant="h5">Cambio de contraseña</Typography>
						<form onSubmit={formik.handleSubmit}>
							<Box noValidate sx={{ mt: 1 }}>
								<TextField
									value={formik.values.password}
									margin="normal"
									fullWidth
									id="password"
									label="Contraseña"
									name="password"
									autoComplete="password"
									type="password"
									autoFocus
									error={
										formik.errors.password && Boolean(formik.errors.password)
									}
									onChange={formik.handleChange}
									helperText={formik.touched.password && formik.errors.password}
								/>
								<TextField
									value={formik.values.passwordConfirm}
									margin="normal"
									fullWidth
									name="confirmPassword"
									label="Confirmar contraseña"
									type="password"
									id="confirmPassword"
									error={
										formik.errors.confirmPassword &&
										Boolean(formik.errors.confirmPassword)
									}
									helperText={
										formik.touched.confirmPassword &&
										formik.errors.confirmPassword
									}
									onChange={formik.handleChange}
								/>

								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
									color="primary"
								>
									Cambiar contraseña
								</Button>

								{errorChangePassword && (
									<Notification
										type="error"
										tittle="Error"
										text="Error en el cambio de contraseña"
									/>
								)}

								<Grid container>
									<Grid item xs>
										<Link component="button" href="#" variant="body2">
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
						</form>
					</Box>
				</Grid>
			</Grid>
			<Dialog
				open={!loadingChangePassword && !errorChangePassword}
				TransitionComponent={Transition}
				onClose={handleCloseConfirmChangePassword}
			>
				<DialogConfirmChangePassword
					handleCloseRef={handleCloseConfirmChangePassword}
				/>
			</Dialog>
		</>
	);
};

export default ChangePassword;
