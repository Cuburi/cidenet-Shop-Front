import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Grid, Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { makeStyles } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: '100%',
	},
	image: {
		width: 128,
		height: 128,
	},
	img: {
		margin: 'auto',
		marginLeft: '100px',
		display: 'block',
		maxWidth: '500px',
		maxHeight: '500px',
	},
	detail: {
		minWidth: '768px',
		flex: '1',
		padding: '0 50px 0 40px',
		textAlign: 'lef',
		webkitBoxFlex: '1',
	},
}));

const DetailProduct = ({ handleCloseRef, open = false, product = {} }) => {
	const classes = useStyles();
	return (
		<Dialog
			fullScreen
			open={open}
			onClose={handleCloseRef}
			TransitionComponent={Transition}
		>
			<div className={classes.root}>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleCloseRef}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Grid container spacing={2}>
					<Grid item>
						<Box className={classes.paper}>
							<img
								src={`data:image/jpeg;base64,${product.image}`}
								className={classes.img}
								alt={product}
							/>
						</Box>
					</Grid>
					<Grid item xs={12} sm container className={classes.detail}>
						<Grid item xs container direction="column" spacing={2}>
							<Grid item xs>
								<Typography
									variant="h5"
									sx={{
										fontWeight: 'bold',
										marginBottom: 5,
										marginTop: 5,
										fontSize: '30px',
									}}
								>
									{product.name}
								</Typography>
								<Typography
									variant="h6"
									sx={{ marginBottom: 5, fontSize: '30px' }}
								>
									{` ${Intl.NumberFormat('es-MX', {
										style: 'currency',
										currency: 'MXN',
										minimumFractionDigits: 0,
									}).format(product.salePrice)}`}
								</Typography>
								<Typography
									variant="p"
									sx={{
										marginBottom: 5,
										fontFamily: 'Lato,sans-serif',
										textDecorationLine: 'underline',
									}}
								>
									{product.description}
								</Typography>
								<Typography variant="h6" sx={{ marginBottom: 5, marginTop: 5 }}>
									{`Marca: ${product.brand.name}`}
								</Typography>
								<Typography variant="h6" sx={{ marginBottom: 5 }}>
									{`Color: ${product.color.name}`}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</Dialog>
	);
};

export default DetailProduct;
