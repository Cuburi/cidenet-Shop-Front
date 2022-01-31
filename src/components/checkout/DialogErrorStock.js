import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DialogErrorStock = ({ handleCloseRef }) => {
	return (
		<>
			<DialogTitle backgroundColor="red">{'Error en la compra '}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					Estimado cliente ha ocurrido un error, hemos ajustado sus producto y
					su cantidad de acuerdo con la cantidad que tenemos, muchas gracias por
					su comprensión.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleCloseRef(true)}>Confirmar</Button>
			</DialogActions>
		</>
	);
};

export default DialogErrorStock;
