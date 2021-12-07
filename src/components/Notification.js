import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef, useState } from 'react';
import AlertTitle from '@mui/material/AlertTitle';

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({ type, tittle, text }) => {
	const [open, setOpen] = useState(true);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		>
			<Alert severity={type}>
				<AlertTitle>{tittle}</AlertTitle>
				{text}
			</Alert>
		</Snackbar>
	);
};

export default Notification;
