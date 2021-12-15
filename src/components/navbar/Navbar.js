import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import cidenetIcon from '../../assets/cidenet-software-a-la-medida-medellin.png';
import { makeStyles } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { useState } from 'react';
import DrawerShoppingCart from '../DrawerContent';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';

import useShoppingCart from '../../hooks/useShoppingCart';

const drawerWidth = 260;

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

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-start',
}));

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	const navigate = useNavigate();
	const { isLogged, logout } = useUser();
	const { shoppingCart } = useShoppingCart();

	const handleLogout = () => {
		navigate('/');
		logout();
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
					<IconButton color="secondary" onClick={handleClickOpen}>
						<Badge color="secondary" badgeContent={8}>
							<ShoppingCartIcon />
						</Badge>
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
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
					},
				}}
				variant="persistent"
				anchor="right"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DrawerHeader>
				{shoppingCart.map((item) => (
					<DrawerShoppingCart product={item} key={item.size.idSize} />
				))}
			</Drawer>
		</Box>
	);
};

export default Navbar;
