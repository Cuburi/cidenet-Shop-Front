import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DialogSendEmail = ({ handleCloseRef, textRef }) => {
	return (
		<>
			<DialogTitle>{'Compra Realizada correctamente'}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					{textRef}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleCloseRef(true)}>Confirmar</Button>
			</DialogActions>
		</>
	);
};

export default DialogSendEmail;
