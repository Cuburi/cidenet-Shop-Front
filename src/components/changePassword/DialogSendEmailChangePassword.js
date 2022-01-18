import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const DialogSendEmailChangePassword = ({ handleCloseRef, sendEmailRef }) => {
	const formik = useFormik({
		initialValues: {
			mailTo: '',
		},
		validationSchema: Yup.object({
			mailTo: Yup.string()
				.email('Email no valido')
				.required('El email es requerido'),
		}),
		onSubmit: (mailTo) => {
			sendEmailRef(mailTo);
			handleCloseRef();
		},
	});

	return (
		<>
			<DialogTitle>Recuperar contraseña</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
				<DialogContent>
					<DialogContentText>
						Te mandaremos un correo con las intrucciones para cambiar tu
						contraseña.
					</DialogContentText>

					<TextField
						id="mailTo"
						name="mailTo"
						autoFocus
						margin="dense"
						label="Correo electronico"
						fullWidth
						variant="standard"
						error={formik.errors.mailTo && Boolean(formik.errors.mailTo)}
						helperText={formik.touched.mailTo && formik.errors.mailTo}
						onChange={formik.handleChange}
						value={formik.values.mailTo}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleCloseRef()}>Cancelar</Button>
					<Button type="submit">Enviar</Button>
				</DialogActions>
			</form>
		</>
	);
};

export default DialogSendEmailChangePassword;
