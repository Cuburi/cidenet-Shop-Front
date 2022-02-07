import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useFormik } from 'formik';
import * as Yup from 'yup';

function DialogNewProp({
	addPropRef,
	namePropRef,
	handleCloseRef,
	loadPropRef,
	setAddSuccessRef,
}) {
	const formik = useFormik({
		initialValues: {
			name: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Es necesario un nombre'),
		}),
		onSubmit: async (prop) => {
			const response = await addPropRef(prop);
			if (response) {
				setAddSuccessRef({ error: false, success: true });
			} else {
				setAddSuccessRef({ error: true, success: false });
			}
			loadPropRef();
			handleCloseRef();
		},
	});
	return (
		<>
			<DialogTitle>Nuevo {namePropRef}</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
				<DialogContent>
					<TextField
						variant="standard"
						id="name"
						label="Nombre"
						name="name"
						fullWidth
						value={formik.values.name}
						onChange={formik.handleChange}
						error={formik.errors.name && Boolean(formik.errors.name)}
						helperText={formik.touched.name && formik.errors.name}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseRef}>Cancel</Button>
					<Button type="submit">Añadir</Button>
				</DialogActions>
			</form>
		</>
	);
}

export default DialogNewProp;
