import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import cidenetIcon from '../../assets/cidenet-software-a-la-medida-medellin.png';
import { makeStyles } from '@material-ui/core';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const useStyles = makeStyles((theme) => ({
	image: {
		marginRight: '10px',
		height: '3rem',
	},
	grow: {
		flexGrow: 1,
	},
	offset: theme.mixins.toolbar,
}));

const Navbar = () => {
	const classes = useStyles();
	return (
		<Box>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>

					<div className={classes.grow}></div>
					<IconButton>
						<img
							className={classes.image}
							src={cidenetIcon}
							alt="Cidenet Shop"
						/>
					</IconButton>
					<div className={classes.grow}></div>
					<IconButton color="inherit">
						<ShoppingCartIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<div className={classes.offset}></div>
		</Box>
	);
};

export default Navbar;
