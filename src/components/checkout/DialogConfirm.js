import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DialogConfirm = ({ handleCloseRef }) => {
	return (
		<>
			<DialogTitle>{'¿Seguro que quieres borrar tu pedido?'}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					Si eliminas tu pedido, los articulos dejarán de estar en tu carrito de
					compra
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleCloseRef(false)}>Seguir comprando</Button>
				<Button onClick={() => handleCloseRef(true)}>Confirmar</Button>
			</DialogActions>
		</>
	);
};

export default DialogConfirm;
