import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DialogConfirmChangePassword = ({ handleCloseRef }) => {
	return (
		<>
			<DialogTitle>{'Cambio de contraseña'}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					Se cambio correctamente la contraseña, inicie sesión con su nueva
					contraseña.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleCloseRef(true)}>Iniciar sesión</Button>
			</DialogActions>
		</>
	);
};

export default DialogConfirmChangePassword;
