import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function DialogConfirmDelete({ handleCloseRef }) {
	return (
		<>
			<DialogTitle>{'¿Seguro que quieres borrar el producto?'}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					¿Seguro que quieres eliminar?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleCloseRef(false)}>Cancelar</Button>
				<Button onClick={() => handleCloseRef(true)}>Confirmar</Button>
			</DialogActions>
		</>
	);
}

export default DialogConfirmDelete;
