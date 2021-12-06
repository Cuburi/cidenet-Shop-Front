import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import cidenetIcon from '../../assets/cidenet-software-a-la-medida-medellin.png';
import { makeStyles } from '@material-ui/core';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';

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
	const navigate = useNavigate();
	const { isLogged, logout } = useUser();
	const handleLogout = () => {
		navigate('/');
		logout();
	};
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
					<IconButton onClick={() => navigate('/')}>
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
					{isLogged ? (
						<IconButton color="inherit" onClick={handleLogout}>
							<Typography variant="body1">Logout</Typography>
							<LogoutIcon />
						</IconButton>
					) : (
						<IconButton color="inherit" onClick={() => navigate('/login')}>
							<Typography variant="body1">Login</Typography>
							<LoginIcon />
						</IconButton>
					)}
				</Toolbar>
			</AppBar>
			<div className={classes.offset}></div>
		</Box>
	);
};

export default Navbar;
