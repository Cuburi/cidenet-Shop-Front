import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DialogSendEmail = ({ handleCloseRef }) => {
	return (
		<>
			<DialogTitle>{'Compra Realizada correctamente'}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					Muchas gracias por confiar en nosotros y permitirnos acompañarte en tu
					día a día. Te hemos enviado un correo con la información de la compra.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleCloseRef(true)}>Confirmar</Button>
			</DialogActions>
		</>
	);
};

export default DialogSendEmail;
