import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DialogConfirmSendEmail = ({ handleCloseRef }) => {
	return (
		<>
			<DialogTitle>{'Cambio de contraseña'}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					Hemos enviado un correo con las instrucciones para cambiar la
					contraseña.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleCloseRef()}>Confirmar</Button>
			</DialogActions>
		</>
	);
};

export default DialogConfirmSendEmail;
