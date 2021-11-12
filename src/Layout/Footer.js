import { Box } from '@mui/system';
import cidenetIcon from '../assets/cidenet-software-a-la-medida-medellin.png';
import { makeStyles } from '@material-ui/core';
import { Grid, IconButton } from '@mui/material';

const useStyles = makeStyles(() => ({
	image: {
		marginRight: '10px',
		height: '3rem',
	},
	grow: {
		flexGrow: 1,
	},
}));

const Footer = () => {
	const classes = useStyles();
	return (
		<footer>
			<Box bgcolor="primary.main" py={{ xs: 5, sm: 5 }}>
				<Grid container spacing={1}>
					<Grid
						item
						xs={2}
						container
						justify="center"
						alignItems="center"
						direction="column"
					>
						<IconButton>
							<img
								className={classes.image}
								src={cidenetIcon}
								alt="Cidenet Shop"
							/>
						</IconButton>
					</Grid>
					<Grid item xs={10}>
						<Box borderBottom={1} borderColor="secondary.main">
							Help
						</Box>
					</Grid>
				</Grid>
			</Box>
		</footer>
	);
};

export default Footer;
