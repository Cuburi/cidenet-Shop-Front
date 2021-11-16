import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import cidenetIcon from '../../assets/cidenet-software-a-la-medida-medellin.png';
import { makeStyles } from '@material-ui/core';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchLine from './SearchLine';

const useStyles = makeStyles((theme) => ({
	image: {
		marginRight: '10px',
		height: '3rem',
	},
	grow: {
		flexGrow: 1,
	},
}));

const Navbar = () => {
	const classes = useStyles();
	return (
		<Box>
			<AppBar position="static">
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
					<Typography>Seccion</Typography>
					<div className={classes.grow}></div>
					<IconButton>
						<img
							className={classes.image}
							src={cidenetIcon}
							alt="Cidenet Shop"
						/>
					</IconButton>
					<div className={classes.grow}></div>
					<SearchLine />
					<IconButton color="inherit">
						<ShoppingCartIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
